import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { User } from '../users/user.entity';
import { UserService } from './user.service';
import { CreateUserInput } from '../users/dto/create.user';
import { UpdateUserInput } from '../users/dto/update.user';
import { Role } from 'src/roles/role.entity';
import { RoleService } from 'src/roles/role.service';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly roleService: RoleService,
  ) {}

  @ResolveField(() => Role, { nullable: true })
  async role(@Parent() user: User): Promise<Role | null> {
    return user.role || null;
  }

  @Query(() => User, { name: 'user' })
  async getUserById(@Args('id') id: string): Promise<User> {
    try {
      return await this.userService.findUserById(id);
    } catch (error) {
      throw new Error(`User not found: ${error.message}`);
    }
  }

  @Query(() => [User], { name: 'users' })
  async getUsers(): Promise<User[]> {
    try {
      const users = await this.userService.findAllUsers();
      const usersWithRoles: User[] = [];
      await Promise.all(
        users.map(async (user) => {
          if (user.roleId) {
            user.role = await this.roleService.findRoleById(user.roleId);
          }
          usersWithRoles.push(user);
        }),
      );
      return usersWithRoles;
    } catch (error) {
      throw new Error(`Error fetching users: ${error.message}`);
    }
  }

  @Query(() => [User], { name: 'usersByRole' })
  async getUsersByRoleId(@Args('roleId') roleId: string): Promise<User[]> {
    try {
      const users = await this.userService.findUsersByRoleId(roleId);
      const usersWithRoles: User[] = [];
      const role = await this.roleService.findRoleById(roleId);
      await Promise.all(
        users.map(async (user) => {
          user.role = role;
          usersWithRoles.push(user);
        }),
      );
      return usersWithRoles;
    } catch (error) {
      throw new Error(`Error fetching users by role: ${error.message}`);
    }
  }

  @Mutation(() => User, { name: 'createUser' })
  async createUser(@Args('input') input: CreateUserInput): Promise<User> {
    try {
      const user = new User();
      user.name = input?.name;
      user.password = input?.password;
      user.email = input?.email;
      user.username = input?.username;
      if (input.roleId) {
        const role = await this.roleService.findRoleById(input.roleId);
        user.roleId = input.roleId;
        user.role = role;
      }
      return await this.userService.createUser(user);
    } catch (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  @Mutation(() => User, { name: 'updateUser' })
  async updateUser(
    @Args('id') id: string,
    @Args('input') input: UpdateUserInput,
  ): Promise<User> {
    try {
      const user = await this.getUserById(id);
      if (input.roleId) {
        const role = await this.roleService.findRoleById(input.roleId);
        user.roleId = input.roleId;
        user.role = role;
      }
      return await this.userService.updateUser(id, user);
    } catch (error) {
      throw new Error(`Error updating user: ${error.message}`);
    }
  }

  @Mutation(() => User, { name: 'deleteUser' })
  async deleteUser(@Args('id') id: string): Promise<User> {
    try {
      return await this.userService.deleteUser(id);
    } catch (error) {
      throw new Error(`Error deleting user: ${error.message}`);
    }
  }
}

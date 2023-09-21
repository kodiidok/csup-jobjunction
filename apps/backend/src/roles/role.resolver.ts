import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { RoleService } from 'src/roles/role.service';
import { UserService } from 'src/users/user.service';
import { CreateRoleInput } from './dto/create.role';
import { UpdateRoleInput } from './dto/update.role';
import { Role } from './role.entity';

@Resolver(() => Role)
export class RoleResolver {
  constructor(
    private readonly roleService: RoleService,
    private readonly userService: UserService,
  ) {}

  @Query(() => Role, { name: 'roleById' })
  async getRoleById(@Args('id') id: string): Promise<Role> {
    try {
      return await this.roleService.findRoleById(id);
    } catch (error) {
      throw new Error(`Error fetching role by ID: ${error.message}`);
    }
  }

  @Query(() => Role, { name: 'roleByRoleName' })
  async getRoleByRoleName(@Args('roleName') roleName: string): Promise<Role> {
    try {
      return await this.roleService.findRoleByRolename(roleName);
    } catch (error) {
      throw new Error(`Error fetching role by roleName: ${error.message}`);
    }
  }

  @Query(() => [Role], { name: 'roles' })
  async getRoles(): Promise<Role[]> {
    try {
      return await this.roleService.findAllRoles();
    } catch (error) {
      throw new Error(`Error fetching roles: ${error.message}`);
    }
  }

  @Mutation(() => Role, { name: 'createRole' })
  async createRole(@Args('input') input: CreateRoleInput): Promise<Role> {
    try {
      return await this.roleService.createRole(input);
    } catch (error) {
      throw new Error(`Error creating role: ${error.message}`);
    }
  }

  @Mutation(() => Role, { name: 'updateRole' })
  async updateRole(
    @Args('id') id: string,
    @Args('input') input: UpdateRoleInput,
  ): Promise<Role> {
    try {
      /**
       * fetch all users by roleId and
       * update role info for these users
       */
      const users = await this.userService.findUsersByRoleId(id);
      users.forEach(async (user) => {
        user.role = await this.getRoleById(user.roleId);
        user.role.name = input.name;
        await this.userService.updateUser(id, user);
      });
      return await this.roleService.updateRole(id, input);
    } catch (error) {
      throw new Error(`Error updating role: ${error.message}`);
    }
  }

  @Mutation(() => Role, { name: 'deleteRole' })
  async deleteRole(@Args('id') id: string): Promise<Role> {
    try {
      /**
       * fetch all users by roleId and delete them, because
       * these users cannot exist without the roleId
       */
      const users = await this.userService.findUsersByRoleId(id);
      users.forEach(async (user) => {
        await this.userService.deleteUser(user.id);
      });
      return await this.roleService.deleteRole(id);
    } catch (error) {
      throw new Error(`Error deleting role: ${error.message}`);
    }
  }

  @Mutation(() => Role, { name: 'softDeleteRole' })
  async softDeleteRole(@Args('id') id: string): Promise<Role> {
    try {
      /**
       * fetch all users by roleId and set roleId null,
       * without deleting the user
       */
      const users = await this.userService.findUsersByRoleId(id);
      users.forEach(async (user) => {
        user.roleId = null;
        user.role = null;
        await this.userService.updateUser(id, user);
      });
      return await this.roleService.deleteRole(id);
    } catch (error) {
      throw new Error(`Error soft deleting role: ${error.message}`);
    }
  }
}

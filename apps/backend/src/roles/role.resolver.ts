import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';

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
    return this.roleService.findRoleById(id);
  }

  @Query(() => Role, { name: 'roleByRoleName' })
  async getRoleByRoleName(@Args('roleName') roleName: string): Promise<Role> {
    return this.roleService.findRoleByRolename(roleName);
  }

  @Query(() => [Role], { name: 'roles' })
  async getRoles(): Promise<Role[]> {
    return this.roleService.findAllRoles();
  }

  @Mutation(() => Role, { name: 'createRole' })
  async createRole(@Args('input') input: CreateRoleInput): Promise<Role> {
    return this.roleService.createRole(input);
  }

  @Mutation(() => Role, { name: 'updateRole' })
  async updateRole(
    @Args('id') id: string,
    @Args('input') input: UpdateRoleInput,
  ): Promise<Role> {
    /**
     * fetch all users by roleId and
     * update role info for these users
     */
    const users = await this.userService.findUsersByRoleId(id);
    users.forEach(async (user) => {
      user.role = await this.getRoleById(user.roleId);
      user.role.name = input.name;
      user.role.division = input.division;
      await this.userService.updateUser(id, user);
    });
    return this.roleService.updateRole(id, input);
  }

  @Mutation(() => Role, { name: 'deleteRole' })
  async deleteRole(@Args('id') id: string): Promise<Role> {
    /**
     * fetch all users by roleId and delete them, because
     * these users cannot exist without the roleId
     */
    const users = await this.userService.findUsersByRoleId(id);
    users.forEach(async (user) => {
      await this.userService.deleteUser(user.id);
    });
    return this.roleService.deleteRole(id);
  }

  @Mutation(() => Role, { name: 'softDeleteRole' })
  async softDeleteRole(@Args('id') id: string): Promise<Role> {
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
    return this.roleService.deleteRole(id);
  }
}

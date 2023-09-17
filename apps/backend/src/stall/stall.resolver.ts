import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { Stall } from './stall.entity';
import { StallService } from './stall.service';
import { CreateStallInput } from './dto/create.stall';
import { UpdateStallInput } from './dto/update.stall';

@Resolver(() => Stall)
export class StallResolver {
  constructor(private readonly stallService: StallService) {}

  @Query(() => [Stall], { name: 'stalls' })
  async findAllStalls(): Promise<Stall[]> {
    try {
      return await this.stallService.findAllStalls();
    } catch (error) {
      throw new Error(`Error fetching stalls: ${error.message}`);
    }
  }

  @Query(() => Stall, { name: 'stall' })
  async findStallById(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Stall> {
    try {
      return await this.stallService.findStallById(id);
    } catch (error) {
      throw new Error(`Error fetching stall by ID: ${error.message}`);
    }
  }

  @Mutation(() => Stall, { name: 'createStall' })
  async createStall(@Args('input') input: CreateStallInput): Promise<Stall> {
    try {
      return await this.stallService.createStall(input);
    } catch (error) {
      throw new Error(`Error creating stall: ${error.message}`);
    }
  }

  @Mutation(() => Stall, { name: 'updateStall' })
  async updateStall(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateStallInput,
  ): Promise<Stall> {
    try {
      return await this.stallService.updateStall(id, input);
    } catch (error) {
      throw new Error(`Error updating stall: ${error.message}`);
    }
  }

  @Mutation(() => Stall, { name: 'deleteStall' })
  async deleteStall(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Stall> {
    try {
      return await this.stallService.deleteStall(id);
    } catch (error) {
      throw new Error(`Error deleting stall: ${error.message}`);
    }
  }
}

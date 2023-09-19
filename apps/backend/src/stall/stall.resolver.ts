import { Resolver, Query, Mutation, Args, ID, ResolveField, Parent } from '@nestjs/graphql';
import { Stall } from './stall.entity';
import { StallService } from './stall.service';
import { CreateStallInput } from './dto/create.stall';
import { UpdateStallInput } from './dto/update.stall';
import { CompanyService } from 'src/company/company.service';
import { Company } from 'src/company/company.entity';

@Resolver(() => Stall)
export class StallResolver {
  constructor(
    private readonly stallService: StallService,
    private readonly compamyService: CompanyService,
  ) {}

  @ResolveField(() => Company, { nullable: true })
  async company(@Parent() stall: Stall): Promise<Company | null> {
    return stall.company || null;
  }

  @Query(() => [Stall], { name: 'stalls' })
  async findAllStalls(): Promise<Stall[]> {
    try {
      const stalls = await this.stallService.findAllStalls();
      const stallsWithCompanies: Stall[] = [];
      await Promise.all(
        stalls.map(async (stall) => {
          if (stall.companyId) {
            stall.company = await this.compamyService.findCompanyById(stall.companyId);
          }
          stallsWithCompanies.push(stall);
        }),
      );
      return stallsWithCompanies;
    } catch (error) {
      throw new Error(`Error fetching stalls: ${error.message}`);
    }
  }

  @Query(() => Stall, { name: 'stall' })
  async findStallById(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Stall> {
    try {
      const stall = await this.stallService.findStallById(id);
      stall.company = await this.compamyService.findCompanyById(stall.companyId);
      return stall;
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

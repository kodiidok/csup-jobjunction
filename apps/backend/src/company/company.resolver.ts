import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { Company } from './company.entity';
import { CompanyService } from './company.service';
import { UpdateCompanyInput } from './dto/update.company';
import { CreateCompanyInput } from './dto/create.company';

@Resolver(() => Company)
export class CompanyResolver {
  constructor(private readonly companyService: CompanyService) {}

  @Query(() => [Company], { name: 'companies' })
  async findAllCompanies(): Promise<Company[]> {
    try {
      return await this.companyService.findAllCompanies();
    } catch (error) {
      throw new Error(`Error fetching companies: ${error.message}`);
    }
  }

  @Query(() => Company, { name: 'company' })
  async findCompanyById(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Company> {
    try {
      return await this.companyService.findCompanyById(id);
    } catch (error) {
      throw new Error(`Error fetching company by ID: ${error.message}`);
    }
  }

  @Mutation(() => Company, { name: 'createCompany' })
  async createCompany(
    @Args('input') input: CreateCompanyInput,
  ): Promise<Company> {
    try {
      return await this.companyService.createCompany(input);
    } catch (error) {
      throw new Error(`Error creating company: ${error.message}`);
    }
  }

  @Mutation(() => Company, { name: 'updateCompany' })
  async updateCompany(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateCompanyInput,
  ): Promise<Company> {
    try {
      return await this.companyService.updateCompany(id, input);
    } catch (error) {
      throw new Error(`Error updating company: ${error.message}`);
    }
  }

  @Mutation(() => Company, { name: 'deleteCompany' })
  async deleteCompany(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Company> {
    try {
      return await this.companyService.deleteCompany(id);
    } catch (error) {
      throw new Error(`Error deleting company: ${error.message}`);
    }
  }
}

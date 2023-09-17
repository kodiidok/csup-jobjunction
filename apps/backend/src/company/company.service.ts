import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './company.entity';
import { UserService } from 'src/users/user.service';
import { StallService } from 'src/stall/stall.service';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    private userService: UserService,
  ) {}

  async createCompany(input: Partial<Company>): Promise<Company> {
    const company = this.companyRepository.create(input);
    return await this.companyRepository.save(company);
  }

  async findAllCompanies(): Promise<Company[]> {
    return await this.companyRepository.find();
  }

  async findCompanyById(id: string): Promise<Company> {
    return await this.companyRepository.findOne({ where: { id } });
  }

  async updateCompany(id: string, input: Partial<Company>): Promise<Company> {
    await this.companyRepository.update(id, input);
    return await this.companyRepository.findOne({ where: { id } });
  }

  async deleteCompany(id: string): Promise<Company> {
    const company = await this.companyRepository.findOne({ where: { id } });
    await this.companyRepository.delete(id);
    return company;
  }
}

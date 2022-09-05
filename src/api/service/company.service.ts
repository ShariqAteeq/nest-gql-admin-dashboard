import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompleteProfileInput } from '../dto/company';
import { Company } from '../entities/company';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company) private companyRepo: Repository<Company>,
  ) {}

  async updateCompanyDetail(payload: CompleteProfileInput): Promise<Company> {
    const company = await this.companyRepo.findOneBy({ id: payload['id'] });
    if (!company) {
      throw new HttpException('Company not found!', HttpStatus.NOT_FOUND);
    }

    company['name'] = payload['name'];
    company['location'] = payload['location'];
    company['noOfEmployee'] = payload['noOfEmployee'];
    company['tech'] = payload['tech'];
    company['currency'] = payload['currency'];
    company['establishedAt'] = payload['establishedAt'];
    return await this.companyRepo.save(company);
  }

  async getCompanyById(id: number): Promise<Company> {
    return await this.companyRepo.findOne({ where: { id } });
  }
}

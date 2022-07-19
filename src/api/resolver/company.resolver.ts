import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CompleteProfileInput } from '../dto/company';
import { Company } from '../entities/company';
import { CompanyService } from '../service/company.service';

@Resolver(() => Company)
export class CompanyResolver {
  constructor(private companyService: CompanyService) {}

  @Mutation(() => Company)
  async completeCompanyProfile(
    @Args('input') input: CompleteProfileInput,
  ): Promise<Company> {
    return await this.companyService.updateCompanyDetail(input);
  }
}

import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { CurrentUser } from 'src/decorators/user.decorator';
import { Role } from 'src/helpers/constant';
import { AddEmployeeInput } from '../dto/employee';
import { Employee } from '../entities/employee';
import { EmployeeService } from '../service/employee.service';

@Resolver()
export class EmployeeResolver {
  constructor(private empService: EmployeeService) {}

  @UseGuards(GqlAuthGuard)
  @Roles(Role.COMPANY, Role.HR)
  @Mutation(() => Employee)
  async addEmployee(
    @Args('input') input: AddEmployeeInput,
    @CurrentUser() user,
    @Context() context,
  ): Promise<Employee> {
    console.log('user in resolver', user);
    return await this.empService.addEmployee(input, context);
  }
}

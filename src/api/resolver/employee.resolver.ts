import { Mutation, Resolver } from '@nestjs/graphql';
import { Roles } from 'src/decorators/roles.decorator';
import { CurrentUser } from 'src/decorators/user.decorator';
import { Role } from 'src/helpers/constant';
import { Employee } from '../entities/employee';
import { EmployeeService } from '../service/employee.service';

@Resolver()
export class EmployeeResolver {
  constructor(private empService: EmployeeService) {}

  @Mutation(() => String)
  @Roles(Role.COMPANY)
  addEmployee(@CurrentUser() user) {
    console.log('user in resolver', user);
    return this.empService.addEmployee();
  }
}

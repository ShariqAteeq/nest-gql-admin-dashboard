import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from 'src/decorators/roles.decorator';
import { Role, UserStatus } from 'src/helpers/constant';
import { AddEmployeeInput } from '../dto/employee';
import { Employee } from '../entities/employee';
import { ProjectEmpHistory } from '../entities/ProjectEmpHistory';
import { EmployeeService } from '../service/employee.service';

@Resolver()
export class EmployeeResolver {
  constructor(private empService: EmployeeService) {}

  @Roles(Role.COMPANY, Role.HR)
  @Mutation(() => Employee)
  async addEmployee(
    @Args('input') input: AddEmployeeInput,
    @Context() context,
  ): Promise<Employee> {
    return await this.empService.addEmployee(input, context);
  }

  @Roles(Role.COMPANY, Role.HR)
  @Query(() => [Employee])
  async listEmployees(@Args('id') id: number): Promise<Employee[]> {
    return await this.empService.listEmployees(id);
  }

  @Roles(Role.COMPANY, Role.HR)
  @Query(() => Employee)
  async employee(@Args('id') id: number): Promise<Employee> {
    return await this.empService.employee(id);
  }

  @Roles(Role.COMPANY, Role.HR)
  @Query(() => [ProjectEmpHistory])
  async listEmployeeProjects(
    @Args('projectId') projectId: number,
    @Args('status') status: UserStatus,
  ): Promise<ProjectEmpHistory[]> {
    return await this.empService.listEmployeeProjects(projectId, status);
  }
}

import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/helpers/constant';
import { Repository } from 'typeorm';
import { ExpenseInput, ListExpenseInput } from '../dto/expense';
import { Company } from '../entities/company';
import { Employee } from '../entities/employee';
import { Expense } from '../entities/expense';
import { Project } from '../entities/project';
import { CompanyService } from '../service/company.service';
import { EmployeeService } from '../service/employee.service';
import { ExpenseService } from '../service/expense.service';
import { ProjectService } from '../service/project.service';
// import empData from "../../../data-seed/EmpExpense.json";

@Resolver(() => Expense)
export class ExpenseResolver {
  constructor(
    @InjectRepository(Employee) private empRepo: Repository<Employee>,
    private expenseService: ExpenseService,
    private companyService: CompanyService,
    private projectService: ProjectService,
    private empService: EmployeeService,
  ) {}

  @Roles(Role.ADMIN, Role.COMPANY)
  @Mutation(() => Expense)
  async addExpense(
    @Args('input') input: ExpenseInput,
    @Context() context,
  ): Promise<Expense> {
    return await this.expenseService.addExpense(input, context);
  }

  //   @Roles(Role.ADMIN, Role.COMPANY)
  //   @Mutation(() => Boolean)
  //   async seedEmpExpense(
  //     @Context() context,
  //   ): Promise<Boolean> {
  //     let promiseArr = [];
  //     for(const x of empData)
  //     return true
  //   }

  @Roles(Role.ADMIN, Role.COMPANY)
  @Mutation(() => Expense)
  async updateExpense(
    @Args('input') input: ExpenseInput,
    @Context() context,
  ): Promise<Expense> {
    return await this.expenseService.updateExpense(input, context);
  }

  @Roles(Role.ADMIN, Role.COMPANY)
  @Mutation(() => Boolean)
  async deleteExpense(@Args('id') id: number): Promise<Boolean> {
    await this.expenseService.deleteExpense(id);
    return true;
  }

  @Roles(Role.EMPLOYEE, Role.COMPANY)
  @Query(() => [Expense])
  async listExpenses(
    @Args('input') input: ListExpenseInput,
    @Context() context,
  ): Promise<Expense[]> {
    return await this.expenseService.listExpense(input, context);
  }

  @ResolveField()
  async company(@Parent() expense: Expense): Promise<Company> {
    if (!expense?.['companyId']) return null;
    return await this.companyService.getCompanyById(expense.companyId);
  }

  @ResolveField()
  async project(@Parent() expense: Expense): Promise<Project> {
    if (!expense?.['projectId']) return null;
    return await this.projectService.project(expense.projectId);
  }

  @ResolveField()
  async employee(@Parent() expense: Expense): Promise<Employee> {
    if (!expense?.['employeeId']) return null;
    return await this.empRepo.findOne({ where: { id: expense.employeeId } });
  }
}

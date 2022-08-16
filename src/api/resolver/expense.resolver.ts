import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/helpers/constant';
import { ExpenseInput, ListExpenseInput } from '../dto/expense';
import { Expense } from '../entities/expense';
import { ExpenseService } from '../service/expense.service';
// import empData from "../../../data-seed/EmpExpense.json";

@Resolver(() => Expense)
export class ExpenseResolver {
  constructor(private expenseService: ExpenseService) {}

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
  @Mutation(() => Expense)
  async deleteExpense(@Args('id') id: number): Promise<Boolean> {
    return await this.expenseService.deleteExpense(id);
  }

  @Roles(Role.EMPLOYEE, Role.COMPANY)
  @Query(() => [Expense])
  async listExpenses(
    @Args('input') input: ListExpenseInput,
    @Context() context,
  ): Promise<Expense[]> {
    return await this.expenseService.listExpense(input, context);
  }
}

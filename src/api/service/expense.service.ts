import { Injectable } from '@nestjs/common';
import { Context } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Repository } from 'typeorm';
import { ExpenseInput, ListExpenseInput } from '../dto/expense';
import { Expense } from '../entities/expense';
import { EmployeeService } from './employee.service';
import { ProjectService } from './project.service';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(Expense) private expenseRepo: Repository<Expense>,
    private authService: AuthService,
    private empService: EmployeeService,
    private proService: ProjectService,
  ) {}

  async addExpense(input: ExpenseInput, @Context() context): Promise<Expense> {
    const user = await this.authService.getUserFromContext(context);
    const expense = new Expense();

    if (input['employeeId']) {
      const employee = await this.empService.employee(input['employeeId']);
      expense['employeeId'] = input['employeeId'];
      expense['employee'] = employee;
    }

    if (input['projectId']) {
      const project = await this.proService.project(input['projectId']);
      expense['projectId'] = input['projectId'];
      expense['project'] = project;
    }

    expense['name'] = input['name'];
    expense['amount'] = input['amount'];
    expense['date'] = input['date'];
    expense['status'] = input['status'];
    expense['expenseTypeId'] = input['expenseTypeId'];
    expense['company'] = user['company'];
    expense['companyId'] = user['company']['id'];
    expense['logCreatedBy'] = user;
    return await this.expenseRepo.save(expense);
  }

  async updateExpense(
    input: ExpenseInput,
    @Context() context,
  ): Promise<Expense> {
    const user = await this.authService.getUserFromContext(context);
    const expense = await this.expenseRepo.findOne({
      where: { id: input['id'] },
    });

    if (!input['employeeId']) {
      expense['employeeId'] = null;
      expense['employee'] = null;
    }

    if (!input['projectId']) {
      expense['projectId'] = null;
      expense['project'] = null;
    }

    expense['name'] = input['name'];
    expense['amount'] = input['amount'];
    expense['date'] = input['date'];
    expense['status'] = input['status'];
    expense['expenseTypeId'] = input['expenseTypeId'];
    expense['logUpdatedBy'] = user;
    return await this.expenseRepo.save(expense);
  }

  async deleteExpense(id: number): Promise<Boolean> {
    await this.expenseRepo.delete({ id });
    return true;
  }

  async listExpense(
    input: ListExpenseInput,
    @Context() context,
  ): Promise<Expense[]> {
    const user = await this.authService.getUserFromContext(context);
    return await this.expenseRepo.find({
      where: {
        companyId: user?.['company']?.['id'],
        projectId: input?.['projectId'],
        employeeId: input?.['employeeId'],
      },
    });
  }
}

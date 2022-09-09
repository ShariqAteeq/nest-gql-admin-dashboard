import { Field, InputType } from '@nestjs/graphql';
import { ExpenseStatus } from 'src/helpers/constant';

@InputType()
export class ExpenseInput {
  @Field()
  name: string;
  @Field({ nullable: true })
  id?: number;
  @Field({ nullable: true })
  companyId: number;
  @Field({ nullable: true })
  projectId: number;
  @Field({ nullable: true })
  employeeId: number;
  @Field()
  date: Date;
  @Field()
  status: ExpenseStatus;
  @Field()
  expenseTypeId: number;
  @Field()
  amount: number;
}

@InputType()
export class ListExpenseInput {
  @Field({ nullable: true })
  companyId: number;
  @Field({ nullable: true })
  projectId: number;
  @Field({ nullable: true })
  employeeId: number;
}

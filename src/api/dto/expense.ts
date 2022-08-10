import { Field, InputType } from '@nestjs/graphql';

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
  expenseTypeId: number;
  @Field()
  amount: number;
}

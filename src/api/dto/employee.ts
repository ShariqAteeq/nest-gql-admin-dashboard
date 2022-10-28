import { Field, InputType } from '@nestjs/graphql';
import { EmployeeType, Role } from 'src/helpers/constant';

@InputType()
export class AddEmployeeInput {
  @Field()
  name: string;
  @Field()
  email: string;
  @Field()
  salary: number;
  @Field(() => Role)
  role: Role;
  @Field(() => [String])
  skills: string[];
  @Field()
  designation: string;
  @Field()
  joiningDate: Date;
  @Field(() => EmployeeType)
  employeeType: EmployeeType;
}

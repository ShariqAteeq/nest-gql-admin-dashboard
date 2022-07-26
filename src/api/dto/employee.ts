import { Field, InputType } from '@nestjs/graphql';
import { EmployeeType, Role } from 'src/helpers/constant';
import { User } from '../entities/user';

@InputType()
export class AddEmployeeInput {
  @Field()
  name: string;
  @Field()
  email: string;
  @Field()
  salary: number;
  @Field()
  role: Role;
  @Field(() => [String])
  skills: string[];
  @Field()
  designation: string;
  @Field()
  joiningDate: Date;
  @Field()
  employeeType: EmployeeType;
  @Field()
  logCreatedBy: User;
}

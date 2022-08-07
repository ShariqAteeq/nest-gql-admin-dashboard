import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { ProjectStatus, UserStatus } from 'src/helpers/constant';

@InputType()
export class AddProjectInput {
  @Field()
  name: string;
  @Field()
  desc: string;
  @Field()
  status: ProjectStatus;
  @Field()
  startDate: Date;
  @Field({ nullable: true })
  endDate: Date;
  @Field(() => [String])
  techs: string[];
}

registerEnumType(ProjectStatus, {
  name: 'ProjectStatus',
});

registerEnumType(UserStatus, {
  name: 'UserStatus',
});

@InputType()
export class ProjectInput {
  @Field({ nullable: true })
  id: number;
  @Field({ nullable: true })
  status: ProjectStatus;
  @Field({ nullable: true })
  empStatus: UserStatus;
}

@InputType()
export class AssignEmployeeToProjectInput {
  @Field()
  projectId: number;
  @Field()
  employeeId: number;
  @Field()
  startDate: Date;
  @Field({ nullable: true })
  endDate: Date;
  @Field()
  status: UserStatus;
}

@InputType()
export class RemoveEmployeeFromProjectInput {
  @Field()
  projectId: number;
  @Field()
  employeeId: number;
}

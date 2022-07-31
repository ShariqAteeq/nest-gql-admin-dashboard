import { Field, InputType } from '@nestjs/graphql';
import { ProjectStatus } from 'src/helpers/constant';

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

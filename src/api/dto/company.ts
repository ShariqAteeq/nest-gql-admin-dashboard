import { Field, InputType } from '@nestjs/graphql';
import { Role } from 'src/helpers/constant';

@InputType()
export class CompleteProfileInput {
  @Field()
  id: number;
  @Field()
  name: string;
  @Field()
  location: string;
  @Field()
  role: Role;
  @Field(() => [String])
  tech: string[];
  @Field()
  currency: string;
  @Field()
  noOfEmployee: string;
  @Field()
  establishedAt: Date;
}

import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CompleteProfileInput {
  @Field()
  id: number;
  @Field()
  name: string;
  @Field()
  location: string;
  @Field(() => [String])
  tech: string[];
  @Field()
  currency: string;
  @Field()
  noOfEmployee: string;
  @Field()
  establishedAt: Date;
}

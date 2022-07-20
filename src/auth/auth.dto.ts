import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginOutput {
  @Field({ nullable: false })
  access_token: string;

  @Field({ nullable: false })
  refresh_token: string;
}

@InputType()
export class LoginInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

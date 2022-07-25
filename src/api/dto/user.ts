import { Field, InputType } from '@nestjs/graphql';
import { Role } from 'src/helpers/constant';

@InputType()
export class UserSignUpInput {
  @Field()
  name: string;
  @Field()
  email: string;
  @Field()
  password: string;
  @Field(() => [Role])
  role: Role[];
}

@InputType()
export class ConfirmSignUpInput {
  @Field()
  code: string;
  @Field()
  email: string;
}

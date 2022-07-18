import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ConfirmSignUpInput, UserSignUpInput } from 'src/api/dto/user';
import { User } from 'src/api/entities/user';
import { UserService } from 'src/api/service/user.service';
import { AuthService } from './auth.service';

@Resolver(() => User)
export class AuthResolver {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Mutation(() => User)
  async signup(
    @Args('input')
    input: UserSignUpInput,
  ): Promise<User> {
    return await this.userService.create(input);
  }

  @Mutation(() => User)
  async confirmSignUp(
    @Args('input')
    input: ConfirmSignUpInput,
  ): Promise<User> {
    return await this.authService.verifyEmail(input);
  }
  @Query(() => [User])
  async list(): Promise<User[]> {
    return await this.userService.findAll();
  }
}

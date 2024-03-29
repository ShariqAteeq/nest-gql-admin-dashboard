import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ConfirmSignUpInput, UserSignUpInput } from 'src/api/dto/user';
import { User } from 'src/api/entities/user';
import { UserService } from 'src/api/service/user.service';
import { Public } from 'src/decorators/public.decorator';
import { LoginInput, LoginOutput, ResetPasswordInput } from './auth.dto';
import { AuthService } from './auth.service';

@Resolver(() => User)
export class AuthResolver {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Public()
  @Mutation(() => User)
  async signup(
    @Args('input')
    input: UserSignUpInput,
  ): Promise<User> {
    return await this.userService.create(input);
  }

  @Public()
  @Mutation(() => LoginOutput)
  async login(@Args('input') input: LoginInput): Promise<LoginOutput> {
    const user = await this.authService.validateUser(input);
    return await this.authService.login(user);
  }

  @Mutation(() => LoginOutput)
  async resetPassword(
    @Args('input') input: ResetPasswordInput,
  ): Promise<LoginOutput> {
    return await this.authService.resetPassword(input);
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

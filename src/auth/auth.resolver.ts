import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserSignUpInput } from 'src/api/dto/user';
import { User } from 'src/api/entities/user';
import { UserService } from 'src/api/service/user.service';

@Resolver(() => User)
export class AuthResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => User)
  async signup(
    @Args('input')
    input: UserSignUpInput,
  ): Promise<User> {
    return await this.userService.create(input);
  }
  @Query(() => [User])
  async list(): Promise<User[]> {
    return await this.userService.findAll();
  }
}

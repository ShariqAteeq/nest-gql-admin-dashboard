import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from '../dto/user';
import { User } from '../entities/user';
import { UserService } from '../service/user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [User])
  async list(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Mutation(() => User)
  async createUser(
    @Args('input')
    input: CreateUserInput,
  ): Promise<User> {
    return await this.userService.create(input);
  }
}

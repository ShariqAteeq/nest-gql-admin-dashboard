import { Args, Query, Resolver } from '@nestjs/graphql';
import { Public } from 'src/decorators/public.decorator';
import { User } from '../entities/user';
import { UserService } from '../service/user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Public()
  @Query(() => User)
  async getUser(@Args('id') id: number): Promise<User> {
    return await this.userService.getUser(id);
  }
}

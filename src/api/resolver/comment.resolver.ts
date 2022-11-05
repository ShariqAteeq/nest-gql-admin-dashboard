import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from '../entities/comment';
import { PubSub } from 'graphql-subscriptions';
import { Public } from 'src/decorators/public.decorator';
import { Roles } from 'src/decorators/roles.decorator';

const pubSub = new PubSub();
@Resolver(() => Comment)
export class CommentResolver {
  constructor(
    @InjectRepository(Comment) private commentRepo: Repository<Comment>,
  ) {}

  @Mutation(() => Comment)
  async addComment(
    @Args('name') name: string,
    @Args('postId') postId: number,
  ): Promise<Comment> {
    const comment = new Comment();
    comment['name'] = name;
    comment['postId'] = postId;
    const res = await this.commentRepo.save(comment);
    pubSub.publish('commentAdded', { my: res });
    return res;
  }

  // @Public()
  // @Roles()
  @Subscription(() => Comment, {
    name: 'my',
    filter(payload, variables) {
      return payload['my']['postId'] === variables['postId'];
    },
  })
  commentAdded(@Args('postId') postId: number) {
    return pubSub.asyncIterator('commentAdded');
  }
}

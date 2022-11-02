import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from '../entities/comment';
import { PubSub } from 'graphql-subscriptions';
import { Public } from 'src/decorators/public.decorator';

const pubSub = new PubSub();
@Resolver(() => Comment)
export class CommentResolver {
  constructor(
    @InjectRepository(Comment) private commentRepo: Repository<Comment>,
  ) {}

  @Mutation(() => Comment)
  async addComment(@Args('name') name: string): Promise<Comment> {
    const comment = new Comment();
    comment['name'] = name;
    const res = await this.commentRepo.save(comment);
    pubSub.publish('commentAdded', { commentAdded: res });
    return res;
  }

  @Public()
  @Subscription((returns) => Comment, {
    name: 'commentAdded',
  })
  commentAdded() {
    return pubSub.asyncIterator('commentAdded');
  }
}

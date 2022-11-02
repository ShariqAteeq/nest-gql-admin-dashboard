import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('Comment')
export class Comment {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @Field()
  id: number;

  @Column()
  @Field()
  name: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  postId: number;
}

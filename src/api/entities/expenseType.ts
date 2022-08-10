import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('ExpenseType')
export class ExpenseType {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @Field()
  id: number;

  @Column()
  @Field({ nullable: true })
  name: string;
}

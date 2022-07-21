import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Company } from './company';
import { User } from './user';

@ObjectType()
@Entity('Employee')
export class Employee {
  @PrimaryColumn({ type: 'bigint' })
  @Field()
  id: number;

  @Column()
  @Field({ nullable: true })
  name: string;

  @Column('text', { array: true, nullable: true })
  @Field(() => [String], { nullable: true })
  skills: string[];

  @Column({ type: 'bigint' })
  @Field({ nullable: true })
  salary: number;

  @CreateDateColumn()
  @Field({ nullable: true })
  joiningDate: Date;

  @CreateDateColumn({
    type: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  @Field({ nullable: true })
  logCreatedAt: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  @Field({ nullable: true })
  logUpdatedAt: Date;

  @ManyToOne(() => Company, (child) => child.employees, { nullable: true })
  @Field(() => Company, { nullable: true })
  company: Company;

  @ManyToOne(() => User, (user) => user.id)
  @Field({ nullable: true })
  logCreatedBy: User;
}

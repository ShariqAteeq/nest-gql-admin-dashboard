import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Employee } from './employee';
import { Project } from './project';
import { User } from './user';

@ObjectType()
@Entity('Company')
export class Company {
  @PrimaryColumn({ type: 'bigint' })
  @Field()
  id: number;

  @Column()
  @Field({ nullable: true })
  name: string;

  @Column()
  @Field({ nullable: true })
  email: string;

  @Column('text', { array: true, nullable: true })
  @Field(() => [String], { nullable: true })
  tech: string[];

  @Column({ nullable: true })
  @Field({ nullable: true })
  currency: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  noOfEmployee: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  location: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  establishedAt: Date;

  @OneToOne(() => User, (child) => child.company, { nullable: true })
  @JoinColumn()
  @Field(() => User, { nullable: true })
  user: User;

  @OneToMany(() => Employee, (child) => child.company)
  @Field(() => [Employee], { nullable: true })
  employees: Employee[];

  // @OneToMany(() => Project, (child) => child.company)
  // @Field(() => [Project], { nullable: true })
  // projects: Project[];

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
}

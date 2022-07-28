import { Field, ObjectType } from '@nestjs/graphql';
import { EmployeeType } from 'src/helpers/constant';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
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

  @Column()
  @Field({ nullable: true })
  email: string;

  @Column()
  @Field({ nullable: true })
  designation: string;

  @Column()
  @Field({ nullable: true })
  employeeType: EmployeeType;

  @Column('text', { array: true, nullable: true })
  @Field(() => [String], { nullable: true })
  skills: string[];

  @Column({ type: 'bigint' })
  @Field({ nullable: true })
  salary: number;

  @Column()
  @Field({ nullable: true })
  joiningDate: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  leftDate: Date;

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

  @Column()
  @Field()
  companyId: number;

  @ManyToOne(() => Company, (child) => child.employees, { nullable: true })
  @Field(() => Company, { nullable: true })
  company: Company;

  @OneToOne(() => User, (child) => child.employee, { nullable: true })
  @JoinColumn()
  @Field(() => User, { nullable: true })
  user: User;

  @ManyToOne(() => User, (user) => user.id, { nullable: true })
  @Field(() => User, { nullable: true })
  logCreatedBy: User;
}

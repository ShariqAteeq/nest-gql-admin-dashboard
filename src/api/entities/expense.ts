import { Field, ObjectType } from '@nestjs/graphql';
import { ExpenseStatus } from 'src/helpers/constant';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Company } from './company';
import { Employee } from './employee';
import { Project } from './project';
import { User } from './user';

@ObjectType()
@Entity('Expense')
export class Expense {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @Field()
  id: number;

  @Column()
  @Field({ nullable: true })
  name: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  companyId: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  employeeId: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  status: ExpenseStatus;

  @Column({ nullable: true })
  @Field({ nullable: true })
  projectId: number;

  @Column()
  @Field({ nullable: true })
  expenseTypeId: number;

  @Column()
  @Field({ nullable: true })
  amount: number;

  @ManyToOne(() => Company, (chil) => chil.id, { nullable: true })
  @JoinColumn({ name: 'company_id' })
  @Field(() => Company, { nullable: true })
  company: Company;

  @ManyToOne(() => Project, (chil) => chil.id, { nullable: true })
  @JoinColumn({ name: 'project_id' })
  @Field(() => Project, { nullable: true })
  project: Project;

  @ManyToOne(() => Employee, (chil) => chil.id, { nullable: true })
  @JoinColumn({ name: 'employee_id' })
  @Field(() => Employee, { nullable: true })
  employee: Employee;

  @Column()
  @Field({ nullable: true })
  date: Date;

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

  @ManyToOne(() => User, (user) => user.id, { nullable: true })
  @Field(() => User, { nullable: true })
  logCreatedBy: User;

  @ManyToOne(() => User, (user) => user.id, { nullable: true })
  @Field(() => User, { nullable: true })
  logUpdatedBy: User;
}

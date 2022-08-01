import { Field, ObjectType } from '@nestjs/graphql';
import { UserStatus } from 'src/helpers/constant';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Company } from './company';
import { Employee } from './employee';
import { Project } from './project';
import { User } from './user';

@ObjectType()
@Entity('ProjectEmpHistory')
export class ProjectEmpHistory {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @Field()
  id: number;

  @OneToOne(() => Project, (chil) => chil.id, { nullable: true })
  @JoinColumn()
  @Field(() => Project, { nullable: true })
  project: Project;

  @OneToOne(() => Employee, (chil) => chil.id, { nullable: true })
  @JoinColumn()
  @Field(() => Employee, { nullable: true })
  employee: Employee;

  @ManyToMany(() => Project, (child) => child.employees, { nullable: true })
  @JoinTable({ name: 'project_emp_relation' })
  @Field(() => [Project], { nullable: true })
  projects: Project[];

  @OneToOne(() => Company, (chil) => chil.id, { nullable: true })
  @JoinColumn()
  @Field({ nullable: true })
  company: Company;

  @Column()
  @Field({ nullable: true })
  status: UserStatus;

  @Column()
  @Field({ nullable: true })
  startDate: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  endDate: Date;

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

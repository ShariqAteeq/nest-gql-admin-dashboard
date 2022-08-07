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
import { Employee } from './employee';
// import { Company } from './company';
// import { Employee } from './employee';
import { Project } from './project';
import { User } from './user';

@ObjectType()
@Entity('ProjectEmpHistory')
export class ProjectEmpHistory {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @Field()
  id: number;

  @Column()
  @Field()
  projectId: number;

  @Column()
  @Field()
  employeeId: number;

  @Column()
  @Field()
  companyId: number;

  @ManyToOne(() => Project, (chil) => chil.id, { nullable: true })
  @Field(() => Project, { nullable: true })
  project: Project;

  @ManyToOne(() => Employee, (chil) => chil.id, { nullable: true })
  @JoinColumn({ name: 'empId' })
  @Field(() => Employee, { nullable: true })
  employee: Employee;

  // @OneToOne(() => Company, (chil) => chil.id, { nullable: true })
  // @JoinColumn()
  // @Field({ nullable: true })
  // company: Company;

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

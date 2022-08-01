import { Field, ObjectType } from '@nestjs/graphql';
import { ProjectStatus } from 'src/helpers/constant';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
// import { Company } from './company';
import { ProjectEmpHistory } from './ProjectEmpHistory';
import { User } from './user';

@ObjectType()
@Entity('Project')
export class Project {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @Field()
  id: number;

  @Column()
  @Field({ nullable: true })
  name: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  desc: string;

  @Column()
  @Field({ nullable: true })
  status: ProjectStatus;

  @Column()
  @Field({ nullable: true })
  startDate: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  endDate: Date;

  @Column('text', { array: true, nullable: true })
  @Field(() => [String], { nullable: true })
  techs: string[];

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

  @ManyToMany(() => ProjectEmpHistory, (child) => child.projects, {
    nullable: true,
  })
  @Field(() => [ProjectEmpHistory], { nullable: true })
  employees: ProjectEmpHistory[];

  //   @ManyToOne(() => Company, (child) => child.projects, { nullable: true })
  //   @Field(() => Company, { nullable: true })
  //   company: Company;

  @ManyToOne(() => User, (user) => user.id, { nullable: true })
  @Field(() => User, { nullable: true })
  logCreatedBy: User;

  @ManyToOne(() => User, (user) => user.id, { nullable: true })
  @Field(() => User, { nullable: true })
  logUpdatedBy: User;
}

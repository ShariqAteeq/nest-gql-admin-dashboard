import { Field, HideField, ObjectType } from '@nestjs/graphql';
import { Role, UserStatus } from 'src/helpers/constant';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Company } from './company';
import { Employee } from './employee';

@ObjectType()
@Entity('User')
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @Field()
  id: number;

  @Column({ unique: true, nullable: true })
  @Field({ nullable: true })
  email: string;

  @Column({ nullable: true })
  @HideField()
  password?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  tempPassword?: string;

  @Field(() => [Role], { nullable: true })
  @Column({
    type: 'enum',
    enum: Role,
    array: true,
  })
  role: Role[];

  @Field({ nullable: true })
  @Column()
  userStatus: UserStatus;

  @Field({ nullable: true })
  @Column({ default: false, nullable: true })
  isEmailVerified: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  emailVerificationCode: string;

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

  @OneToOne(() => Company, (child) => child.user, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @Field(() => Company, { nullable: true })
  company: Company;

  @OneToOne(() => Employee, (child) => child.user, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @Field(() => Employee, { nullable: true })
  employee: Employee;

  @ManyToOne(() => User, (user) => user.id)
  @Field(() => User, { nullable: true })
  logCreatedBy: User;

  @ManyToOne(() => User, (user) => user.id)
  @Field(() => User, { nullable: true })
  logUpdatedBy: User;
}

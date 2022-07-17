import { Field, HideField, ObjectType } from '@nestjs/graphql';
import { UserRole, UserStatus } from 'src/helpers/constant';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity('User')
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @Field()
  id: number;

  @Column()
  @Field()
  name: string;

  @Column({ unique: true, nullable: true })
  @Field({ nullable: true })
  email: string;

  @Column({ nullable: true })
  @HideField()
  password: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  tempPassword: string;

  @Field(() => [UserRole])
  @Column({
    type: 'enum',
    enum: UserRole,
    array: true,
  })
  role: UserRole[];

  @Field()
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
  @Field()
  logCreatedAt: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  @Field()
  logUpdatedAt: Date;

  @ManyToOne(() => User, (user) => user.id)
  @Field()
  logCreatedBy: User;

  @ManyToOne(() => User, (user) => user.id)
  @Field()
  logUpdatedBy: User;
}

import { Field, HideField, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('User')
export class User {
  @PrimaryGeneratedColumn('rowid')
  @Field()
  id: string;

  @Column()
  @Field()
  name: string;

  //   @Column({ unique: true, nullable: true })
  //   @Field({ nullable: true })
  //   email: string;

  //   @Column({ nullable: true })
  //   @HideField()
  //   password: string;

  //   @Column({ nullable: true })
  //   @Field({ nullable: true })
  //   tempPassword: string;

  //   @Field()
  //   @Column()
  //   type: string;

  //   @Field()
  //   @Column()
  //   userStatus: string;

  //   @Field({ nullable: true })
  //   @Column({ default: false, nullable: true })
  //   isEmailVerified: boolean;

  //   @Field({ nullable: true })
  //   @Column({ nullable: true })
  //   emailVerificationCode: string;
}

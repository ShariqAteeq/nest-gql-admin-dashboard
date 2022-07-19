import { Field, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity('Company')
export class Company {
  @PrimaryColumn({ type: 'bigint' })
  @Field()
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  email: string;

  @Column('text', { array: true, nullable: true })
  @Field(() => [String])
  tech: string[];

  @Column({ nullable: true })
  @Field()
  currency: string;

  @Column({ nullable: true })
  @Field()
  noOfEmployee: string;

  @Column({ nullable: true })
  @Field()
  location: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  establishedAt: Date;

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
}

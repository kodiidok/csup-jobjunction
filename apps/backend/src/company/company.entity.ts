import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Stall } from 'src/stall/stall.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Company extends User{
  // @OneToMany(() => Stall, (stall) => stall.company, { nullable: true })
  // @Field(() => [Stall], { nullable: true })
  // stalls: Stall[];
}

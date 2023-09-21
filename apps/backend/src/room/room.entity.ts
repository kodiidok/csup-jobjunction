import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Interview } from 'src/interview/interview.entity';
import { Stall } from 'src/stall/stall.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity()
@ObjectType()
export class Room {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  roomNumber: string;

  @Column()
  @Field()
  roomStatus: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  currentStudent?: string;

  @OneToMany((type) => Interview, (interview: Interview) => interview.room)
  @Field(() => [Interview], { nullable: true })
  interviews: Interview[];

  @Column('simple-array', { nullable: true })
  interviewIds: string[];

  @OneToMany((type) => Interview, (interview: Interview) => interview.room)
  @Field(() => [Interview], { nullable: true })
  completedInterviews: Interview[];

  @Column('simple-array', { nullable: true })
  completedInterviewIds: string[];

  @OneToOne((type) => Stall, (stall: Stall) => stall.id)
  @JoinColumn({ name: 'stallId', referencedColumnName: 'id' })
  @Field(() => Stall, { nullable: true })
  stall: Stall;

  @Column({ nullable: true })
  stallId?: string;

  constructor() {
    this.id = uuidv4(); // Generate a new UUID for the 'id' field when a new Room instance is created
  }
}

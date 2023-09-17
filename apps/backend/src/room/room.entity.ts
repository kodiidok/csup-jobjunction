import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Interview } from 'src/interview/interview.entity';
import { Stall } from 'src/stall/stall.entity';

@Entity()
@ObjectType()
export class Room {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  roomNumber: string;

  @Column()
  @Field()
  roomStatus: string;

  @Column()
  @Field({ nullable: true })
  currentStudent?: string;

  @OneToMany((type) => Interview, (interview: Interview) => interview.id)
  interviews: Interview[];

  @OneToOne((type) => Stall, (stall: Stall) => stall.id)
  @JoinColumn({ name: 'stallId', referencedColumnName: 'id' })
  @Field(() => Stall, { nullable: true })
  stall: Stall;
}

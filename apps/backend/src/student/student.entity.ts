import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Room } from 'src/room/room.entity';
import { Interview } from 'src/interview/interview.entity';
import { User } from 'src/users/user.entity';

@Entity()
@ObjectType()
export class Student extends User {
  @ManyToMany((type) => Interview, (interview) => interview.id)
  interviews: Interview[];
}

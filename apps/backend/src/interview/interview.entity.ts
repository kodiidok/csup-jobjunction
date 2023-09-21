import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Student } from 'src/student/student.entity';
import { Room } from 'src/room/room.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity()
@ObjectType()
export class Interview {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  interviewDate: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  interviewTime: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  status?: string;

  @ManyToMany((type) => Student, (student: Student) => student.interviews, {
    nullable: true,
  })
  @JoinTable({
    name: 'student_interviews',
    joinColumn: { name: 'interviewId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'studentId', referencedColumnName: 'id' },
  })
  @Field(() => [Student], { nullable: true })
  students?: Student[];

  @Column('simple-array', { nullable: true })
  studentIds: string[];

  @ManyToOne((type) => Room, (room: Room) => room.id, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @JoinColumn([{ name: 'roomId', referencedColumnName: 'id' }])
  @Field(() => Room, { nullable: true })
  room: Room;

  @Column({ nullable: true })
  roomId: string;

  constructor() {
    this.id = uuidv4(); // Generate a new UUID for the 'id' field when a new Interview instance is created
  }
}

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

@Entity()
@ObjectType()
export class Interview {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  interviewDate: Date;

  @Column()
  @Field()
  interviewTime: string;

  @Column()
  @Field({ nullable: true })
  status?: string;

  @ManyToMany((type) => Student, { cascade: true })
  @JoinTable({
    name: 'student_interviews',
    joinColumn: { name: 'interviewId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'studentId' },
  })
  students: Student[];

  @ManyToOne((type) => Room, (room: Room) => room.id, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @JoinColumn([{ name: 'roomId', referencedColumnName: 'id' }])
  room: Room;
}

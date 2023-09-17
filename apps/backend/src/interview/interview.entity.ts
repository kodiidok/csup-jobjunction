import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Student } from 'src/student/student.entity';

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
}

import { Column, Entity, ManyToMany } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { Interview } from 'src/interview/interview.entity';
import { User } from 'src/users/user.entity';

@Entity()
@ObjectType()
export class Student extends User {
  @ManyToMany((type) => Interview, (interview) => interview.students, {
    nullable: true,
  })
  interviews: Interview[];

  @Column()
  @Field()
  studentId: string;
}

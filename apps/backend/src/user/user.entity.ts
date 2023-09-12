import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Company } from 'src/company/company.entity';
import { Student } from 'src/student/student.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: string;

  @Column()
  @Field({ nullable: true })
  name: string;

  @Column()
  @Field()
  username: string;

  @Column()
  @Field()
  email: string;

  @Column()
  @Field()
  password: string;

  @OneToOne(() => Student, (student) => student.user, { nullable: true })
  student?: Student;

  @OneToOne(() => Company, (company) => company.user, { nullable: true })
  company?: Company;
}

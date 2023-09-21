import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateStudentInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  username: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  password: string;

  @Field({ nullable: true })
  roleId?: string;

  @Field()
  studentId?: string;

  @Field(() => [ID], { nullable: true })
  interviewIds?: string[];
}

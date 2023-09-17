import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateInterviewInput {
  @Field()
  interviewDate: Date;

  @Field()
  interviewTime: string;

  @Field({ nullable: true })
  status?: string;
}

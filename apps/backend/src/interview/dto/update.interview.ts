import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateInterviewInput {
  @Field({ nullable: true })
  interviewDate?: Date;

  @Field({ nullable: true })
  interviewTime?: string;

  @Field({ nullable: true })
  status?: string;
}

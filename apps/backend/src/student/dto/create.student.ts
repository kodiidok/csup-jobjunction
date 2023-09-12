import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateStudentInput {
  @Field()
  studentId: string;

  @Field()
  studentEmail: string;

  @Field()
  studentName: string;

  @Field(() => [ID], { nullable: true })
  interestedRoomIds?: string[]; // Assuming you will provide an array of Room IDs
}

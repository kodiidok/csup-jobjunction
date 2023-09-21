import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateRoomInput {
  @Field({ nullable: true })
  roomNumber: string;

  @Field()
  roomName: string;

  @Field(() => ID, { nullable: true })
  stallId: string; // Assuming you will provide the Stall ID for the room

  @Field({ nullable: true })
  roomStatus: string;

  @Field({ nullable: true })
  floor: string;

  @Field(() => [ID], { nullable: true })
  interviewIds?: string[];

  @Field(() => [ID], { nullable: true })
  completedInterviewIds?: string[];
}

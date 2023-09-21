import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateStallInput {

  @Field(() => ID)
  companyId: string; // Assuming you will provide the Company ID for the stall

  @Field(() => ID, { nullable: true })
  roomId?: string; // Assuming you will provide the Room ID for the stall
}

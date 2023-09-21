import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class UpdateStallInput {
  
  @Field(() => ID, { nullable: true })
  companyId?: string;

  @Field(() => ID, { nullable: true })
  roomId?: string;
}

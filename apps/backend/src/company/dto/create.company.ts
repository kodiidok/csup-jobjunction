import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateCompanyInput {
  @Field()
  companyName: string;

  @Field(() => ID)
  userId: string;
}

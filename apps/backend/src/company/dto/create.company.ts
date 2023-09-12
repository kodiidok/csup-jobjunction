import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCompanyInput {
  @Field()
  companyName: string;

  // You can add other fields as needed
}

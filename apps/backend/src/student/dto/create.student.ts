import { InputType, Field } from '@nestjs/graphql';

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

  // @Field(() => [ID], { nullable: true })
  // interestedRoomIds?: string[]; // Assuming you will provide an array of Room IDs
}

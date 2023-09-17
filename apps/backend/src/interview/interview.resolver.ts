import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Interview } from './interview.entity';
import { InterviewService } from './interview.service';
import { UpdateInterviewInput } from './dto/update.interview';
import { CreateInterviewInput } from './dto/create.interview';
import { Student } from 'src/student/student.entity';
import { Room } from 'src/room/room.entity';
import { RoomService } from 'src/room/room.service';
import { StudentService } from 'src/student/student.service';

@Resolver(() => Interview)
export class InterviewResolver {
  constructor(
    private readonly interviewService: InterviewService,
    private readonly roomService: RoomService,
    private readonly studentService: StudentService,
  ) {}

  @ResolveField(() => Student, { nullable: true })
  async students(@Parent() interview: Interview): Promise<Student[] | null> {
    try {
      return interview.students || null;
    } catch (error) {
      throw new Error(
        `Error fetching students for interview: ${error.message}`,
      );
    }
  }

  @ResolveField(() => Room, { nullable: true })
  async room(@Parent() interview: Interview): Promise<Room | null> {
    try {
      return interview.room || null;
    } catch (error) {
      throw new Error(`Error fetching room for interview: ${error.message}`);
    }
  }

  @Query(() => [Interview], { name: 'interviews' })
  async findAllInterviews(): Promise<Interview[]> {
    try {
      return await this.interviewService.findAllInterviews();
    } catch (error) {
      throw new Error(`Error fetching interviews: ${error.message}`);
    }
  }

  @Query(() => Interview, { name: 'interview' })
  async findInterviewById(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Interview> {
    try {
      return await this.interviewService.findInterviewById(id);
    } catch (error) {
      throw new Error(`Error fetching interview by ID: ${error.message}`);
    }
  }

  @Mutation(() => Interview, { name: 'createInterview' })
  async createInterview(
    @Args('input') input: CreateInterviewInput,
    @Args('studentIds', { type: () => [String], nullable: true })
    studentIds?: string[],
  ): Promise<Interview> {
    try {
      // Check if studentIds are provided
      if (studentIds && studentIds.length > 0) {
        return await this.interviewService.createInterview(input, studentIds);
      } else {
        // Create an interview without associating any students
        return await this.interviewService.createInterview(input, null);
      }
    } catch (error) {
      throw new Error(`Error creating interview: ${error.message}`);
    }
  }

  @Mutation(() => Interview, { name: 'updateInterview' })
  async updateInterview(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateInterviewInput,
    @Args('studentIds', { type: () => [String], nullable: true })
    studentIds?: string[],
  ): Promise<Interview> {
    try {
      // Check if studentIds are provided
      if (studentIds && studentIds.length > 0) {
        return await this.interviewService.updateInterview(id, input, studentIds);
      } else {
        // Create an interview without associating any students
        return await this.interviewService.updateInterview(id, input, null);
      }
    } catch (error) {
      throw new Error(`Error updating interview: ${error.message}`);
    }
  }

  @Mutation(() => Interview, { name: 'deleteInterview' })
  async deleteInterview(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Interview> {
    try {
      return await this.interviewService.deleteInterview(id);
    } catch (error) {
      throw new Error(`Error deleting interview: ${error.message}`);
    }
  }
}

import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { Student } from './student.entity';
import { StudentService } from './student.service';
import { CreateStudentInput } from './dto/create.student';
import { UpdateStudentInput } from './dto/update.student';

@Resolver(() => Student)
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  @Query(() => [Student], { name: 'students' })
  async findAllStudents(): Promise<Student[]> {
    try {
      return await this.studentService.findAllStudents();
    } catch (error) {
      throw new Error(`Error fetching students: ${error.message}`);
    }
  }

  @Query(() => Student, { name: 'student' })
  async findStudentById(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Student> {
    try {
      return await this.studentService.findStudentById(id);
    } catch (error) {
      throw new Error(`Error fetching student by ID: ${error.message}`);
    }
  }

  @Mutation(() => Student, { name: 'createStudent' })
  async createStudent(
    @Args('input') input: CreateStudentInput,
  ): Promise<Student> {
    try {
      return await this.studentService.createStudent(input);
    } catch (error) {
      throw new Error(`Error creating student: ${error.message}`);
    }
  }

  @Mutation(() => Student, { name: 'updateStudent' })
  async updateStudent(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateStudentInput,
  ): Promise<Student> {
    try {
      return await this.studentService.updateStudent(id, input);
    } catch (error) {
      throw new Error(`Error updating student: ${error.message}`);
    }
  }

  @Mutation(() => Student, { name: 'deleteStudent' })
  async deleteStudent(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Student> {
    try {
      return await this.studentService.deleteStudent(id);
    } catch (error) {
      throw new Error(`Error deleting student: ${error.message}`);
    }
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { CreateStudentInput } from './dto/create.student';
import { UserService } from 'src/user/user.service';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    private userService: UserService,
  ) {}

  async createStudent(input: CreateStudentInput): Promise<Student> {
    const user = await this.userService.findUserById(input.userId);

    if (!user) {
      throw new Error('User not found!');
    }

    const newStudent = new Student();

    newStudent.studentName = input.studentName;
    newStudent.studentEmail = input.studentEmail;
    newStudent.studentId = input.studentId;
    newStudent.userId = input.userId;
    newStudent.user = user;

    const student = this.studentRepository.create(newStudent);
    const createStudent = await this.studentRepository.save(student);
    return createStudent;
  }

  async findAllStudents(): Promise<Student[]> {
    return await this.studentRepository.find();
  }

  async findStudentById(id: string): Promise<Student> {
    return await this.studentRepository.findOne({ where: { id } });
  }

  async updateStudent(id: string, input: Partial<Student>): Promise<Student> {
    await this.studentRepository.update(id, input);
    return await this.studentRepository.findOne({ where: { id } });
  }

  async deleteStudent(id: string): Promise<Student> {
    const student = await this.studentRepository.findOne({ where: { id } });
    await this.studentRepository.delete(id);
    return student;
  }
}

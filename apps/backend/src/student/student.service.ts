import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { CreateStudentInput } from './dto/create.student';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async findAllStudents(): Promise<Student[]> {
    return await this.studentRepository.find();
  }

  async findStudentById(id: string): Promise<Student> {
    return await this.studentRepository.findOne({ where: { id } });
  }

  async createStudent(input: CreateStudentInput): Promise<Student> {
    const student = this.studentRepository.create(input);
    return await this.studentRepository.save(student);
  }

  async updateStudent(id: string, input: Partial<Student>): Promise<Student> {
    await this.studentRepository.update(id, input);
    return await this.findStudentById(id);
  }

  async deleteStudent(id: string): Promise<Student> {
    const student = await this.studentRepository.findOne({ where: { id } });
    await this.studentRepository.delete(id);
    return student;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async createStudent(input: Partial<Student>): Promise<Student> {
    const student = this.studentRepository.create(input);
    return await this.studentRepository.save(student);
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

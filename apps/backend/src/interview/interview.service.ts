import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Interview } from './interview.entity';
import { StudentService } from 'src/student/student.service';
import { RoomService } from 'src/room/room.service';

@Injectable()
export class InterviewService {
  constructor(
    @InjectRepository(Interview)
    private readonly interviewRepository: Repository<Interview>,
    private readonly studentService: StudentService,
    private readonly roomService: RoomService,
  ) {}

  async createInterview(
    input: Partial<Interview>,
    studentIds: string[],
  ): Promise<Interview> {
    if (studentIds) {
      input.students = await this.studentService.findStudentsByIds(studentIds);
    }
    input.room = await this.roomService.findRoomById(input.roomId);
    const interview = this.interviewRepository.create(input);
    return await this.interviewRepository.save(interview);
  }

  async findAllInterviews(): Promise<Interview[]> {
    const interviews = await this.interviewRepository.find();
    await Promise.all(
      interviews.map(async (interview) => {
        const room = await this.roomService.findRoomById(interview.roomId);
        const students = await this.studentService.findStudentsByInterviewId(
          interview.id,
        );
        interview.room = room;
        interview.students = students;
      }),
    );
    return interviews;
  }

  async findInterviewById(id: string): Promise<Interview> {
    const interview = await this.interviewRepository.findOne({ where: { id } });
    const room = await this.roomService.findRoomById(interview.roomId);
    const students = await this.studentService.findStudentsByInterviewId(
      interview.id,
    );
    interview.room = room;
    interview.students = students;
    return interview;
  }

  async updateInterview(
    id: string,
    input: Partial<Interview>,
    studentIds: string[],
  ): Promise<Interview> {
    if (studentIds) {
      input.students = await this.studentService.findStudentsByIds(studentIds);
    }
    input.room = await this.roomService.findRoomById(input.roomId);
    await this.interviewRepository.update(id, input);
    return await this.interviewRepository.findOne({ where: { id } });
  }

  async deleteInterview(id: string): Promise<Interview> {
    const interview = await this.interviewRepository.findOne({ where: { id } });
    await this.interviewRepository.delete(id);
    return interview;
  }
}

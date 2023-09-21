import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './room.entity';
import { RoomResolver } from './room.resolver';
import { RoomService } from './room.service';
import { StallModule } from 'src/stall/stall.module';
import { CompanyModule } from 'src/company/company.module';
import { InterviewModule } from 'src/interview/interview.module';
import { StudentModule } from 'src/student/student.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Room]),
    StallModule,
    CompanyModule,
    StudentModule,
    forwardRef(() => InterviewModule),
  ],
  providers: [RoomResolver, RoomService],
  exports: [RoomService],
})
export class RoomModule {}

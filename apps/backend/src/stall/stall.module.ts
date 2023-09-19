import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stall } from './stall.entity';
import { StallResolver } from './stall.resolver';
import { StallService } from './stall.service';
import { CompanyModule } from 'src/company/company.module';

@Module({
  imports: [TypeOrmModule.forFeature([Stall]), forwardRef(() => CompanyModule)],
  providers: [StallResolver, StallService],
  exports: [StallService],
})
export class StallModule {}
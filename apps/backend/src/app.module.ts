import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDbConfig } from './common/config/ormconfig';
import { UserModule } from './users/user.module';
import { RoleModule } from './roles/role.module';
import { StudentModule } from './student/student.module';
import { InterviewModule } from './interview/interview.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
    }),
    
    TypeOrmModule.forRoot(getDbConfig('postgres')),

    UserModule,
    RoleModule,
    StudentModule,
    InterviewModule,
    // AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

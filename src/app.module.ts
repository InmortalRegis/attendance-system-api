import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../ormconfig';
import { Employee } from './employees/entities/employee.entity';
import { EmployeeService } from './employees/employee.service';
import { EmployeeController } from './employees/employee.controller';
import { Log } from './logs-module/entities/log.entity';
import { LogController } from './logs-module/log.controller';
import { LogService } from './logs-module/log.services';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    TypeOrmModule.forFeature([Employee, Log]),
  ],
  controllers: [AppController, EmployeeController, LogController],
  providers: [AppService, EmployeeService, LogService],
})
export class AppModule {}

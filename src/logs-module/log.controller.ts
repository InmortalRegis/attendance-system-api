import {
  Body,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { WebSocketServer } from '@nestjs/websockets';
import { EmployeeService } from 'src/employees/employee.service';
import { EntityNotFoundError } from 'typeorm';
import { CreateLogDto } from './dto/create-log.dto';
import { Log } from './entities/log.entity';
import { LogService } from './log.services';
import { Server } from 'socket.io';
import { LogGateway } from './log.gateway';

@Controller('logs')
export class LogController {
  @WebSocketServer()
  server: Server;
  constructor(
    private readonly logService: LogService,
    private readonly employeeService: EmployeeService,
    private readonly logGateway: LogGateway,
  ) {}

  @Get()
  getAll(): Promise<Log[]> {
    return this.logService.findAll();
  }

  @Post()
  @HttpCode(200)
  async createLog(@Body() createLogDto: CreateLogDto) {
    console.log(
      '🚀 ~ file: log.controller.ts ~ line 29 ~ LogController ~ createLog ~ createLogDto',
      createLogDto,
    );
    try {
      const employee = await this.employeeService.getOneByUid(createLogDto.uid);

      const log = await this.logService.createLog(
        employee,
        employee.nextDirection,
      );
      this.logGateway.logCreated(log);

      return log;
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        console.log('The employee doesnt exists.');
        throw new NotFoundException('The employee doesnt exists.');
      }
    }
  }
}

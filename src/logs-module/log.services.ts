import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from 'src/employees/entities/employee.entity';
import { Repository } from 'typeorm';
import { Log } from './entities/log.entity';

@Injectable()
export class LogService {
  constructor(
    @InjectRepository(Log) private readonly logRepository: Repository<Log>,
  ) {}

  findAll(): Promise<Log[]> {
    return this.logRepository.find({
      relations: ['employee'],
    });
  }

  createLog(employee: Employee, nextDirection: number) {
    const log = this.logRepository.create({
      direction: nextDirection,
      employee: employee,
    });

    return this.logRepository.save(log);
  }
}

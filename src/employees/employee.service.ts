import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';

import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeeService {
  /**
   *
   */
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    @InjectConnection() private connection: Connection,
  ) {}

  findAll(): Promise<Employee[]> {
    return this.employeeRepository.find({
      relations: ['logs'],
    });
  }

  getOneById(id: number): Promise<Employee> {
    try {
      const employee = this.employeeRepository.findOneOrFail(id);
      return employee;
    } catch (error) {
      throw error;
    }
  }

  async getOneByUid(uid: string): Promise<Employee> {
    try {
      // const employee = await this.employeeRepository.findOneOrFail({
      //   where: { uid },
      // });
      const employee = await this.connection
        .getRepository(Employee)
        .createQueryBuilder('e')
        .select('e.*')
        .addSelect(
          'COALESCE((SELECT l.`direction` FROM `log` as l WHERE `employeeId` = e.id ORDER BY l.`id` DESC LIMIT 1) * -1, 1)',
          'nextDirection',
        )
        .where('e.uid = :uid', { uid })
        .getRawOne();
      return employee;
    } catch (error) {
      throw error;
    }
  }
}

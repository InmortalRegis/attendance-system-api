import { Employee } from 'src/employees/entities/employee.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Log {
  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'integer', default: 1 })
  direction: number; //DEFAULT '1'  '+1 (present); -1 (absent)'

  @ManyToOne((type) => Employee, (employee) => employee.logs)
  employee: Employee;

  employeeId: number;
}

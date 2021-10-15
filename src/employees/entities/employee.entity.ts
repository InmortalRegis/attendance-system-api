import { Log } from 'src/logs-module/entities/log.entity';
import {
  AfterInsert,
  AfterLoad,
  AfterUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  uid: string;

  @OneToMany((type) => Log, (log) => log.employee)
  logs: Log[];

  nextDirection: number;
}

import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

// const config: SqliteConnectionOptions = {
//   type: 'sqlite',
//   database: 'db.sqlite',
//   entities: ['dist/src/**/*.entity.js'],
//   synchronize: true,
// };

const config: MysqlConnectionOptions = {
  host: 'behmd64f4mjub0xyd41w-mysql.services.clever-cloud.com',
  port: 3306,
  username: 'ud4pdadi8q7iagth',
  password: 'UYkPfL0tP2pz3p8UQFel',
  database: 'behmd64f4mjub0xyd41w',
  entities: ['dist/src/**/*.entity.js'],
  synchronize: true,
  type: 'mysql',
};

export default config;

import 'dotenv/config';
import { DataSourceOptions } from 'typeorm';
import { isLocalEnv } from '../../../commons/utils/applications.utils';

export const typeOrmConfig = () => {
  return {
    type: process.env.DB_TYPE as any,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    userName: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + '/entity-schemas/*.entity-schema.{js,ts}'],
    migrationsTableName: 'migrations',
    migrations: [__dirname + '/../../../commons/migrations/{dml,ddl}/*.{js,ts}'],
    cli: {
      migrationsDir: __dirname + '/../../../commons/migrations'
    },
    logging: isLocalEnv(),
  } as DataSourceOptions;
};

import { isLocalEnv } from "src/commons/utils/applications.utils"

export const typeOrmConfig = () => {
  return {
    type: process.env.DB_TYPE as any,
    host: process.env.DB_HOST,
    port: process.env.PORT,
    userName: process.env.DB_USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + '/entity-schemas/*.entity-schema.{js,ts}'],
    migrations: [__dirname + '../../../commons/migrations/{dml|ddl}/*.{js,ts}'],
    logging: !isLocalEnv(),
  };
};

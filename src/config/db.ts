import { DataSource, DataSourceOptions } from 'typeorm';
import { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME, DB_LOGGING, DB_SYNC } from '../util/secrets';
import { Client } from '../entity/client.entity';

const dbOptions: DataSourceOptions = {
    type: 'mssql',
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    entities: [Client],
    logging: DB_LOGGING,
    synchronize: DB_SYNC,
    options: {
        encrypt: false
    }
};

export const dataSource = new DataSource(dbOptions);
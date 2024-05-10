import { DataSource, DataSourceOptions } from 'typeorm';
const os = require('os');

let entitiesPath = __dirname.replace('database', 'typeorm');
if (os.platform() == 'win32') {
  entitiesPath += '\\entity\\*.entity.js';
} else {
  entitiesPath += '/entity/*.entity.js';
}

export const options: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT) || 5432,
  username: process.env.DATABASE_USER || 'root',
  password: process.env.DATABASE_PASS || '123',
  database: process.env.DATABASE_NAME || 'fastfood',
  entities: [entitiesPath],
  synchronize: true
};

export const AppDataSource = new DataSource(options);

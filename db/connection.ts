import dotenv from 'dotenv';
import path from 'path';
const ENV = process.env.NODE_ENV || 'development';
dotenv.config({
  path: path.resolve(__dirname, `../../.env.${ENV}`),
});
import { Database } from '../src/data-access/Database';

export default new Database();

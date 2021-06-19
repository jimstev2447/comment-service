import dotenv from 'dotenv';
import path from 'path';
const ENV = process.env.NODE_ENV || 'development';
dotenv.config({
  path: path.resolve(__dirname, `../../.env.${ENV}`),
});
import { Database } from '../src/data-access';

async function setupDb() {
  console.log('Setting up database...');
  // database collection will automatically be created if it does not exist
  // indexes will only be added if they don't exist
  const db = await new Database().makeDb();
  const result = await db.collection('comments').createIndexes([
    { key: { hash: 1 }, name: 'hash_idx' },
    { key: { postId: -1 }, name: 'postId_idx' },
    { key: { replyToId: -1 }, name: 'replyToId_idx' },
  ]);
  console.log(result);
  console.log('Database setup complete...');
  process.exit();
}

setupDb();

import { Database } from '../src/data-access/Database';
import dotenv from 'dotenv';
import path from 'path';
const ENV = process.env.NODE_ENV || 'development';
dotenv.config({
  path: path.resolve(__dirname, `../../.env.${ENV}`),
});

export default (async function () {
  const db = new Database();
  await db.connect();
  const result = await db
    .getDb()
    .collection('comments')
    .createIndexes([
      { key: { hash: 1 }, name: 'hash_idx' },
      { key: { postId: -1 }, name: 'postId_idx' },
      { key: { replyToId: -1 }, name: 'replyToId_idx' },
    ]);
  console.log(result);
  console.log('Database setup complete...');
  process.exit();
})();

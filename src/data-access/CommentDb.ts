import connection from '../../db/connection';
import { CommentInfo } from '../Comment';
import { Database } from './Database';

export class CommentDb {
  private connection: Database;
  constructor() {
    this.connection = connection;
  }
  async insert({ id, ...comment }: CommentInfo): Promise<CommentInfo> {
    await this.connection.connect();
    const commentDb = await this.connection.getDb().collection('comments');
    const insertedComment = await (
      await commentDb.insertOne({ _id: id, ...comment })
    ).ops[0];
    return { ...insertedComment, id: insertedComment._id };
  }
}

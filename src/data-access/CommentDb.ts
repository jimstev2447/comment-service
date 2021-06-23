import { Comment } from '../Comment';
import { Id } from '../Id';
import { Database } from './Database';

export class CommentDb {
  private connection: Database;
  constructor(connection: Database) {
    this.connection = connection;
  }
  async insert(comment: Comment): Promise<Comment> {
    let { id: _id, ...commentInfo } = comment.getComment();
    await this.connection.connect();
    const commentDb = await this.connection.getDb().collection('comments');
    const { _id: id, ...restOfComment } = await (
      await commentDb.insertOne({ _id, ...commentInfo })
    ).ops[0];
    return { id, ...restOfComment };
  }
}

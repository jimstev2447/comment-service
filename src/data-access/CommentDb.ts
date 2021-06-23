import { Comment, CommentInfo } from '../Comment';
import { Id } from '../Id';
import { Database } from './Database';

export class CommentDb {
  private connection: Database;
  constructor(connection: Database) {
    this.connection = connection;
  }
  async insert(comment: Comment): Promise<Comment> {
    await this.connection.connect();
    const commentDb = await this.connection
      .getDb()
      .collection<CommentInfo>('comments');
    const insertedComment = await (
      await commentDb.insertOne({ ...comment.getComment() })
    ).ops[0];
    return new Comment(insertedComment, new Id());
  }
}

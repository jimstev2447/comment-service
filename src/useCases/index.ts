import { CommentDb } from '../data-access/CommentDb';
import { Comment, CommentInfo } from '../Comment';
import { Id } from '../Id';

interface addsComment {
  addComment: (c: CommentInfo, Id: Id) => Promise<CommentInfo>;
}
export class UseCases implements addsComment {
  private commentDb: CommentDb;
  constructor() {
    this.commentDb = new CommentDb();
  }
  addComment(commentInfo: CommentInfo, id: Id) {
    const comment = new Comment(commentInfo, id);
    return this.commentDb.insert(comment.getComment());
  }
}

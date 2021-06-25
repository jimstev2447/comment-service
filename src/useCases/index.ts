import { Comment, CommentInfo, Id_spec } from '../Comment';

export interface CommentManager {
  insert: (c: CommentInfo) => Promise<CommentInfo>;
}

export class UseCases {
  constructor(private commentManager: CommentManager, private Id: Id_spec) {}
  addComment(commentInfo: CommentInfo) {
    const comment = new Comment(commentInfo, this.Id);
    return this.commentManager.insert(comment.getComment());
  }
}

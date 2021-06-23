import { CommentInfo } from '../Comment';
import { HTTPRequest } from '../ExpressInterface';
import { Id_interface, Id } from '../Id';
import { UseCases } from '../useCases';

interface PostsComment {
  getPostComment: () => (
    req: HTTPRequest
  ) => Promise<{ statusCode: number; body: { comment: CommentInfo } }>;
}

export class CommentControllers implements PostsComment {
  private useCases: {
    addComment: (c: CommentInfo, Id: Id_interface) => Promise<CommentInfo>;
  };
  constructor() {
    this.useCases = new UseCases();
  }
  getPostComment() {
    return async (req: HTTPRequest) => {
      const commentInfo: CommentInfo = {
        author: req.body.author,
        text: req.body.text,
        postId: req.body.postId,
        id: req.body.id,
        createdOn: req.body.createdOn,
      };
      const insertedComment = await this.useCases.addComment(
        commentInfo,
        new Id()
      );
      return { statusCode: 201, body: { comment: insertedComment } };
    };
  }
}

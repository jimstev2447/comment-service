import { CommentInfo } from '../Comment';
import { Id } from '../Id';
import { UseCases } from '../useCases';

interface CommentBody {
  comment: CommentInfo;
}

interface PostsComment {
  getPostComment: () => Controller<CommentBody>;
}
export type HTTPRequest = {
  body: { [key: string]: any };
  query: {};
  params: {};
  ip: string;
  method: string;
  path: string;
  headers: {
    'Content-Type': string | undefined;
    Referer: string | undefined;
    'User-Agent': string | undefined;
  };
};
export interface Controller<T> {
  (r: HTTPRequest): Promise<{ statusCode: number; body: T }>;
}
export class CommentControllers implements PostsComment {
  private useCases: {
    addComment: (c: CommentInfo, Id: Id) => Promise<CommentInfo>;
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

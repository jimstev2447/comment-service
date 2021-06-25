import { CommentInfo } from '../Comment';
import { UseCases } from '../useCases';

export class CommentControllers implements returnsPostCommentController {
  constructor(private useCases: UseCases) {}
  givePostComment() {
    return async (req: HTTPRequest) => {
      const commentInfo: CommentInfo = {
        author: req.body.author,
        text: req.body.text,
        postId: req.body.postId,
        id: req.body.id,
        createdOn: req.body.createdOn,
      };
      const insertedComment = await this.useCases.addComment(commentInfo);
      return { statusCode: 201, body: { comment: insertedComment } };
    };
  }
}
interface PostCommentResponseBody {
  comment: CommentInfo;
}
interface returnsPostCommentController {
  givePostComment: () => Controller<PostCommentResponseBody>;
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
export type Controller<T> = (
  r: HTTPRequest
) => Promise<{ statusCode: number; body: T }>;

import { Id_interface } from './Id';

export interface CommentInfo {
  author: string;
  text: string;
  createdOn?: number;
  postId: string;
  id?: string;
}

export class Comment {
  private author: string;
  private text: string;
  private createdOn: number;
  private postId: string;
  private id: string;
  constructor(
    { author, text, createdOn = Date.now(), postId, id }: CommentInfo,
    Id: Id_interface
  ) {
    this.author = author;
    this.text = text;
    this.createdOn = createdOn;
    this.postId = postId;
    this.id = typeof id !== 'undefined' && Id.isValidId(id) ? id : Id.makeId();
  }
  getComment() {
    const { author, text, createdOn, postId, id } = this;
    return { author, text, createdOn, postId, id };
  }
}

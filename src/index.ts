import express from 'express';
import { Comment } from './Comment';
import { Id } from './Id';
import connection from '../db/connection';
import { CommentDb } from './data-access/CommentDb';

const app = express();
app.use(express.json());

app.post('/api/comments', async (req, res) => {
  const id = new Id();
  const comment = new Comment(
    {
      author: req.body.author,
      text: req.body.text,
      postId: req.body.postId,
      id: req.body.id,
      createdOn: req.body.createdOn,
    },
    id
  );
  const cDB = new CommentDb(connection);
  const insertedComment = await cDB.insert(comment);
  res.status(201).send({ comment: insertedComment.getComment() });
});
export { app };

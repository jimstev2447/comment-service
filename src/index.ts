import express from 'express';
import { Comment } from './Comment';
import { Id } from './Id';
import connection from '../db/connection';

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

  await connection.connect();
  const commentDb = await connection.getDb().collection('comments');
  const result = await commentDb.insertOne(comment);
  res.status(201).send({ comment: result.ops[0] });
});
export { app };

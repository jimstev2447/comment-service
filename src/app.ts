import express from 'express';
import { ExpressImplementation } from './ExpressInterface';
import { CommentControllers } from './controllers/CommentControllers';
const controllerHandler = new ExpressImplementation();
const controllers = new CommentControllers();
const app = express();
app.use(express.json());
app.post(
  '/api/comments',
  controllerHandler.returnController(controllers.getPostComment())
);
export { app };

import express from 'express';
import { ExpressImplementation } from './ExpressInterface';
import { CommentControllers } from './controllers/CommentControllers';
import { UseCases } from './useCases';
import { CommentDb } from './data-access/CommentDb';
import { Id } from './Id';
const controllerHandler = new ExpressImplementation();
const controllers = new CommentControllers(
  new UseCases(new CommentDb(), new Id())
);
const app = express();
app.use(express.json());
app.post(
  '/api/comments',
  controllerHandler.returnController(controllers.givePostComment())
);
export { app };

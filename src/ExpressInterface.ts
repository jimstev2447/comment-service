import { RequestHandler } from 'express';
import { Controller, HTTPRequest } from './controllers/CommentControllers';

interface ReturnsController {
  returnController<T>(controller: Controller<T>): RequestHandler<{}, T>;
}

export class ExpressImplementation implements ReturnsController {
  constructor() {}
  returnController<T>(controller: Controller<T>): RequestHandler<{}, T> {
    return async (req, res) => {
      const request: HTTPRequest = {
        body: req.body,
        query: req.query,
        params: req.params,
        ip: req.ip,
        method: req.method,
        path: req.path,
        headers: {
          'Content-Type': req.get('Content-Type'),
          Referer: req.get('referer'),
          'User-Agent': req.get('User-Agent'),
        },
      };
      const response = await controller(request);
      res.status(response.statusCode);
      res.send(response.body);
    };
  }
}

export default ExpressImplementation;

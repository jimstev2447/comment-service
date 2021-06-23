import e from 'express';

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

export type Controller<T> = {
  (r: HTTPRequest): Promise<{ statusCode: number; body: T }>;
};

export class ExpressImplementation {
  constructor() {}
  returnController<T>(controller: Controller<T>): e.RequestHandler {
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

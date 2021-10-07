import { Request, Response, NextFunction } from 'express';
import { v4 } from 'uuid';
import logHandler from '../common/handlers/logHandler';
import traceHandlerFactory from '../common/handlers/trace/traceHandlerFactory';

const preRequestAction = request => {
  const { headers, path, body } = request;
  const uniqueId = v4();
  request.uniqueId = uniqueId;

  const traceHandler = traceHandlerFactory.createInstance(uniqueId);
  traceHandler.setTrackId(headers['x-track-id']);
  traceHandler.startRequestTrace();

  logHandler.info(traceHandler, {
    action: 'START_REQUEST',
    description: `request to ${path} started`,
    details: {
      body,
      headers,
    },
  });
};

export default function beforeRequestMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  preRequestAction(request);
  next();
}

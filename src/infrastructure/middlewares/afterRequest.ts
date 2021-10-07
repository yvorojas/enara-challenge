import { Request, Response, NextFunction } from 'express';
import logHandler from '../common/handlers/logHandler';
import traceHandlerFactory from '../common/handlers/trace/traceHandlerFactory';

const postRequestAction = ({ path, uniqueId }, { statusCode, json }) => {
  const traceHandler = traceHandlerFactory.getInstanceById(uniqueId);
  if (statusCode >= 200 && statusCode < 300) {
    traceHandler.endRequestTrace();
    logHandler.info(traceHandler, {
      action: 'FINISH_REQUEST',
      description: `request to ${path} finished succesfully with status ${statusCode}`,
      details: {
        status: statusCode,
        body: json,
        timelapse: `${traceHandler.getRequestTimelapse()}ms`,
      },
    });
  }
  traceHandlerFactory.removeInstanceById(traceHandler.id);
};

export default function afterRequestMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  postRequestAction(request as any, response);
  next();
}

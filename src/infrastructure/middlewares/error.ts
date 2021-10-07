import { Response, NextFunction } from 'express';
import logHandler from '../common/handlers/logHandler';
import traceHandlerFactory from '../common/handlers/trace/traceHandlerFactory';

export default function errorMiddleware(
  err,
  req: any,
  res: Response,
  next: NextFunction,
) {
  const traceHandler = traceHandlerFactory.getInstanceById(req.uniqueId);
  traceHandler.endRequestTrace();
  let errorResponse;
  let statusCode;

  if (err.details && err.details.data) {
    errorResponse = err.details.data;
    statusCode = err.details.data.status || err.details.data.code;
  } else {
    statusCode = err.status || 500;
    errorResponse = {
      message: err.baseMessage || 'Internal Server Error',
      code: statusCode,
      status: statusCode,
      internalCode: err.code || 'INTERNAL_SERVER_ERROR',
      details: err.details,
    };
  }
  logHandler.error(traceHandler, {
    action: 'FINISH_REQUEST_WITH_ERROR',
    description: `request to ${req.path} finished with error ${statusCode}`,
    details: {
      ...errorResponse,
      timelapse: `${traceHandler.getRequestTimelapse()}ms`,
    },
  });
  res.status(statusCode).json(errorResponse);
  next();
}

import Axios, { AxiosResponse, AxiosError } from 'axios';
import traceHandlerFactory from '../common/handlers/trace/traceHandlerFactory';
import logHandler from '../common/handlers/logHandler';

const client = Axios.create();

const createStartRequestMessage = request => ({
  action: 'START_CALLING_CLIENT',
  description: `call to client ${request.method.toUpperCase()}: ${
    request.url
  } started`,
  details: {
    params: request.params,
    body: request.data,
    headers: request.headers,
  },
});

const createFinishRequestMessage = (data, status, headers, config) => ({
  action: 'FINISH_CALLING_CLIENT',
  description: `call to client ${config.method.toUpperCase()}: ${
    config.url
  } finished successfully with status code ${status}`,
  details: {
    status,
    body: data,
    headers,
  },
});

const getStatusCode = response => (response ? response.status : 500);

const createErrorRequestMessage = error => {
  const statusCode = getStatusCode(error.response);
  return {
    action: 'FINISH_CALLING_CLIENT_WITH_ERROR',
    description: `call to client ${error.config.method.toUpperCase()}: ${
      error.config.url
    } finished with error, with status code ${statusCode}`,
    details: {
      status: statusCode,
      body: error.response ? error.response.data : null,
      headers: error.response ? error.response.headers : null,
    },
  };
};

client.interceptors.request.use(request => {
  if (request.headers['Content-Type'] == null) {
    request.headers['Content-Type'] = 'application/json';
  }
  const traceHandler = traceHandlerFactory.getInstanceByTrackId(
    request.headers['x-track-id'],
  );
  logHandler.info(traceHandler, createStartRequestMessage(request));
  return request;
});

client.interceptors.response.use(
  ({ data, status, headers, config }: AxiosResponse) => {
    const traceHandler = traceHandlerFactory.getInstanceByTrackId(
      config.headers['x-track-id'],
    );
    logHandler.info(
      traceHandler,
      createFinishRequestMessage(data, status, headers, config),
    );
    return Promise.resolve({
      data,
      status,
    } as AxiosResponse);
  },
  (error: AxiosError) => {
    const traceHandler = traceHandlerFactory.getInstanceByTrackId(
      error.config.headers['x-track-id'],
    );
    logHandler.error(traceHandler, createErrorRequestMessage(error));
    return Promise.reject(error);
  },
);

export default client;

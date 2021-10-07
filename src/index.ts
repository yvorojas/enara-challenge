import './infrastructure/common/env';
import Server from './infrastructure/server';
import routes from './infrastructure/routes';
import errorMiddleware from './infrastructure/middlewares/error';
import beforeRequestMiddleware from './infrastructure/middlewares/beforeRequest';
import afterRequestMiddleware from './infrastructure/middlewares/afterRequest';
import connect from './infrastructure/repositories/mongoConnector';

const port = parseInt(process.env.PORT);

JSON.parse(process.env.CONNECT_TO_MONGO)
  ? connect()
  : console.log('not connect to DB due env variable');

export default new Server()
  .registerMiddleware(beforeRequestMiddleware)
  .registerRoutes(routes)
  .registerMiddleware(errorMiddleware)
  .registerMiddleware(afterRequestMiddleware)
  .listen(port);

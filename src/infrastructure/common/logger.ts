import pino from 'pino';

const logger = pino({
  name: process.env.APP_ID,
  level: process.env.LOG_LEVEL,
  enabled: process.env.NODE_ENV != 'test',
  timestamp: () => `,"time":"${new Date(Date.now()).toISOString()}"`,
});

export default logger;

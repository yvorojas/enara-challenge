import logger from '../logger';

export default class LogHandler {
  static logFormat = {
    system: process.env.SYSTEM,
    service: process.env.APP_ID,
    environment: process.env.NODE_ENV,
    appVersion: process.env.npm_package_version,
  };

  static info(traceHandler, message) {
    const infoToLog = LogHandler.buildInfoToLog(traceHandler, message, 'INFO');
    logger.info(infoToLog);
  }

  static error(traceHandler, message) {
    const infoToLog = LogHandler.buildInfoToLog(traceHandler, message, 'ERROR');
    logger.error(infoToLog);
  }

  private static buildInfoToLog = (traceHandler, message, severity) => ({
    trackId: traceHandler.getTrackId(),
    uniqueId: traceHandler.getUniqueId(),
    ...LogHandler.logFormat,
    country: traceHandler.getCountry(),
    message,
    severity,
  });
}

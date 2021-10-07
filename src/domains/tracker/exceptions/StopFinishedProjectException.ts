import BaseError from '../../../infrastructure/common/exceptions/BaseError';
const code = 'STOP_FINISHED_SEGMENT_IN_PROJECT';
const name = 'StopFinishedProjectException';
const baseMessage = 'Trying to stop a project with finished segment';
const status = 422;
export default class StopFinishedProjectException extends BaseError {
  constructor(project) {
    super(baseMessage, {
      code,
      name,
      baseMessage,
      status,
      details: { project },
    });
    Object.setPrototypeOf(this, StopFinishedProjectException.prototype);
  }
}

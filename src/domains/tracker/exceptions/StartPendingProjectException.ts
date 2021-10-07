import BaseError from '../../../infrastructure/common/exceptions/BaseError';
const code = 'START_PENDING_PROJECT';
const name = 'StartPendingProjectException';
const baseMessage = 'Trying to start a project with pending segment';
const status = 422;
export default class StartPendingProjectException extends BaseError {
  constructor(project) {
    super(baseMessage, {
      code,
      name,
      baseMessage,
      status,
      details: { project },
    });
    Object.setPrototypeOf(this, StartPendingProjectException.prototype);
  }
}

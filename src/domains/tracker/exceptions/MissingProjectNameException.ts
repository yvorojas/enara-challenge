import BaseError from '../../../infrastructure/common/exceptions/BaseError';
const code = 'MISSING_PROJECT_NAME';
const name = 'MissingProjectNameException';
const baseMessage = 'Request Validation Failed: Missing project name';
const status = 400;
export default class MissingProjectNameException extends BaseError {
  constructor() {
    super(baseMessage, {
      code,
      name,
      baseMessage,
      status,
      details: { message: baseMessage },
    });
    Object.setPrototypeOf(this, MissingProjectNameException.prototype);
  }
}

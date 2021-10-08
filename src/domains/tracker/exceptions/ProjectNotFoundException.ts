import BaseError from '../../../infrastructure/common/exceptions/BaseError';
const code = 'PROJECT_NOT_FOUND';
const name = 'ProjectNotFoundException';
const baseMessage = 'Project not found';
const status = 404;
export default class ProjectNotFoundException extends BaseError {
  constructor(project) {
    super(baseMessage, {
      code,
      name,
      baseMessage,
      status,
      details: { project },
    });
    Object.setPrototypeOf(this, ProjectNotFoundException.prototype);
  }
}

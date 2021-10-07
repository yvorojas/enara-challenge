import BaseError from './BaseError';
const code = 'ENTITY_VALIDATION_ERROR';
const name = 'EntityValidationException';
const baseMessage = 'Entity Validation Failed';
const status = 400;
export default class EntityValidationException extends BaseError {
  constructor(message, entity) {
    const details = { message, entity };
    super(message, { code, name, baseMessage, status, details });
    Object.setPrototypeOf(this, EntityValidationException.prototype);
  }
}

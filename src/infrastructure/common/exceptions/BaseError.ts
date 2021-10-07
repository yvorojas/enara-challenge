export default class BaseError extends Error {
  public status;
  public baseMessage;
  public details;
  public code;
  constructor(message, { name, baseMessage, status, code, details }) {
    super(message);
    this.code = code;
    this.name = name;
    this.baseMessage = baseMessage;
    this.status = status;
    this.details = details;
  }
}

import BaseError from './BaseError';

const code = 'CLIENT_COMMUNICATION_ERROR';

const getStatusCode = ({ response }) => (response ? response.status : 500);

const getDetails = ({
  config: { url, method, headers },
  response,
  message,
}) => ({
  url,
  method: method.toUpperCase(),
  data: response ? response.data : message,
  headers,
});
export default class ClientException extends BaseError {
  constructor(clientError, name, baseMessage) {
    super(clientError.message, {
      name,
      baseMessage,
      status: getStatusCode(clientError),
      code,
      details: getDetails(clientError),
    });
    Object.setPrototypeOf(this, ClientException.prototype);
  }
}

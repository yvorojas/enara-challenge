import ClientException from '../../../infrastructure/common/exceptions/ClientException';

const name = 'DemoClientException';
const baseMessage = 'Communication with Demo Client Failed';

export default class DemoClientException extends ClientException {
  constructor(clientError) {
    super(clientError, name, baseMessage);
  }
}

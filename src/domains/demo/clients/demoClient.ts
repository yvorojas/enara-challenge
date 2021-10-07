import apiClient from '../../../infrastructure/gateways/apiClient';
import DemoClientException from '../exceptions/DemoClientException';

const callToClient = async () =>
  apiClient
    .get(`${process.env.CLIENT_URL}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(({ data }) => data)
    .catch(clientError => {
      throw new DemoClientException(clientError);
    });

export { callToClient };

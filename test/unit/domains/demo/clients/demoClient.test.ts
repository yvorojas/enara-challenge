import { callToClient } from '../../../../../src/domains/demo/clients/demoClient';
import DemoClientException from '../../../../../src/domains/demo/exceptions/DemoClientException';
import apiClient from '../../../../../src/infrastructure/gateways/apiClient';

jest.mock('../../../../../src/infrastructure/gateways/apiClient');

describe('Schedule Client test', () => {
  beforeEach(() => {
    (apiClient as jest.Mocked<typeof apiClient>).get.mockClear();
  });

  it('should call to api client', async () => {
    const expectedResponse = { attribute: 'value' };
    (apiClient as jest.Mocked<typeof apiClient>).get.mockResolvedValue({
      data: expectedResponse,
    });

    const response = await callToClient();

    expect(apiClient.get).toHaveBeenCalledTimes(1);
    expect(response).toStrictEqual(expectedResponse);
  });

  it('should return error when api client call fails', async () => {
    const mockError = {
      message: 'DUMMY_ERROR',
      response: { status: 503 },
      config: {
        url: 'http://dummy.com',
        method: 'POST',
        data: '{}',
        headers: {},
      },
    };
    const error = new DemoClientException(mockError);

    (apiClient as jest.Mocked<typeof apiClient>).get.mockRejectedValue(
      mockError,
    );

    await expect(callToClient()).rejects.toStrictEqual(error);
    expect(apiClient.get).toHaveBeenCalledTimes(1);
  });
});

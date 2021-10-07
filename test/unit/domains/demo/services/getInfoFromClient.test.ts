import GetInfoFromClientUseCase from '../../../../../src/domains/demo/services/getInfoFromClient';

const expectedResponse = { attribute: 'value' };
jest.mock('../../../../../src/domains/demo/clients/demoClient', () => ({
  callToClient: async () => expectedResponse,
}));

describe('get info from client use case tests', () => {
  it('should return client response', async () => {
    const response = await new GetInfoFromClientUseCase().execute();

    expect(response).toStrictEqual(expectedResponse);
  });
});

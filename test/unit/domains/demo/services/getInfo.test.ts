import GetInfoUseCase from '../../../../../src/domains/demo/services/getInfo';

describe('get user info use case test', () => {
  it('should return user info when execute method is called', () => {
    const expectedResponse = {
      products: [
        {
          id: 'id1',
          price: 1500,
          quantity: 1,
        },
        {
          id: 'id1',
          price: 1500,
          quantity: 2,
        },
      ],
    };

    const demoInfo = new GetInfoUseCase().execute();
    expect(demoInfo).toStrictEqual(expectedResponse);
  });
});

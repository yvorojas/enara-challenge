import { mocked } from 'ts-jest/utils';
import GetInfoUseCase from '../../../../../src/domains/demo/services/getInfo';
import DemoUseCases from '../../../../../src/domains/demo/services/';

const mockedFunction = jest.fn();
jest.mock('../../../../../src/domains/demo/services/getInfo', () =>
  jest.fn().mockImplementation(() => ({
    execute: mockedFunction,
  })),
);
jest.mock('../../../../../src/domains/demo/services/getInfoFromClient', () =>
  jest.fn().mockImplementation(() => ({
    execute: mockedFunction,
  })),
);

describe('Demo Use Cases unit test', () => {
  const demoUseCases = new DemoUseCases();
  const mockedGetInfoUseCase = mocked(GetInfoUseCase, true);

  beforeEach(() => {
    mockedFunction.mockClear();
    mockedFunction.mockReset();
  });
  it('should get info response when call to Get Info Use Case', () => {
    const mockResponse = { attribute: 'value' };
    mockedFunction.mockReturnValue(mockResponse);

    const response = demoUseCases.getInfo();

    expect(mockedGetInfoUseCase).toHaveBeenCalledTimes(1);
    expect(mockedFunction).toHaveBeenCalledWith();
    expect(mockedFunction).toHaveBeenCalledTimes(1);
    expect(response).toStrictEqual(mockResponse);
  });

  it('should get info from client response when call to Get Info from client use case', async () => {
    const mockResponse = { attribute: 'value' };
    mockedFunction.mockResolvedValue(mockResponse);

    const response = await demoUseCases.getInfoFromClient();

    expect(mockedGetInfoUseCase).toHaveBeenCalledTimes(1);
    expect(mockedFunction).toHaveBeenCalledWith();
    expect(mockedFunction).toHaveBeenCalledTimes(1);
    expect(response).toStrictEqual(mockResponse);
  });
});

import { Request } from 'express';
import DemoController from '../../../../../src/domains/demo/controllers';
import EntityValidationException from '../../../../../src/infrastructure/common/exceptions/EntityValidationException';

const mockedFunction = jest.fn();
jest.mock('../../../../../src/domains/demo/services', () =>
  jest.fn().mockImplementation(() => ({
    getInfo: mockedFunction,
    getInfoFromClient: mockedFunction,
  })),
);

describe('demo controller test', () => {
  beforeEach(() => {
    mockedFunction.mockClear();
    mockedFunction.mockReset();
  });
  it('should return info when call to get info use case', async () => {
    const mockResponse = { attribute: 'value' };
    mockedFunction.mockReturnValueOnce(mockResponse);
    const response: any = {
      json: jest.fn(),
    };
    response.status = jest.fn().mockReturnValue(response);

    const request = {
      body: {},
    } as Request;

    const controller = new DemoController();

    await controller.getInfo(request, response);

    expect(mockedFunction).toHaveBeenCalledTimes(1);
    expect(response.status).toHaveBeenCalledTimes(1);
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith(mockResponse);
  });

  it('should return validated request body', async () => {
    const validBody = {
      validAttribute: 'hello_world',
    };
    const response: any = {
      json: jest.fn(),
    };
    response.status = jest.fn().mockReturnValue(response);

    const request = {
      body: validBody,
    } as Request;

    const controller = new DemoController();

    await controller.validateEntity(request, response);

    expect(response.status).toHaveBeenCalledTimes(1);
    expect(response.status).toHaveBeenCalledWith(201);
    expect(response.json).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith(validBody);
  });

  it('should return exception when request body is invalid', () => {
    const validBody = {
      invalidAttribute: 'hello_world',
    };
    const response: any = {
      json: jest.fn(),
    };
    response.status = jest.fn().mockReturnValue(response);

    const request = {
      body: validBody,
    } as Request;

    const controller = new DemoController();

    expect(() => {
      controller.validateEntity(request, response);
    }).toThrow(EntityValidationException);
  });

  it('should return info when call to get info from client use case', async () => {
    const mockResponse = { attribute: 'value' };
    mockedFunction.mockResolvedValueOnce(mockResponse);
    const response: any = {
      json: jest.fn(),
    };
    response.status = jest.fn().mockReturnValue(response);

    const request = {
      body: {},
    } as Request;

    const controller = new DemoController();

    await controller.callToClient(request, response);

    expect(mockedFunction).toHaveBeenCalledTimes(1);
    expect(response.status).toHaveBeenCalledTimes(1);
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith(mockResponse);
  });
});

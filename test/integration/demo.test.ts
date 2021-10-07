import supertest from 'supertest';
import mockAxios from 'axios';
import server from '../../src';
import { connect, closeDatabase } from './mocks/mongo';

describe('Demo integration tests', () => {
  let request;

  beforeAll(async () => {
    jest.mock(
      '../../src/infrastructure/repositories/mongoConnector',
      async () => {
        await connect();
      },
    );
    request = supertest(server);
  });

  afterAll(async done => {
    await closeDatabase();
    await server.close();
    done();
  });

  it('should get demo info when call to demo controller get demo info method', async () => {
    const res = await request.get('/api/v1/demo').expect(200);

    expect(res.body).toStrictEqual({
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
    });
  });

  it('should return validated request', async () => {
    const validBody = {
      validAttribute: 'Im a valid attribute',
    };

    const res = await request
      .post('/api/v1/demo/validate')
      .send(validBody)
      .expect(201);

    expect(res.body).toStrictEqual(validBody);
  });

  it('should return exception response when request is invalid', async () => {
    const invalidBody = {
      invalidAttribute: 'Im a invalid attribute',
    };
    const invalidResponse = {
      code: 400,
      status: 400,
      details: {
        entity: 'DemoRequestDto',
        message: '"validAttribute" is required',
      },
      internalCode: 'ENTITY_VALIDATION_ERROR',
      message: 'Entity Validation Failed',
    };
    const res = await request
      .post('/api/v1/demo/validate')
      .send(invalidBody)
      .expect(400);

    expect(res.body).toStrictEqual(invalidResponse);
  });

  it('should return exception response when request is invalid', async () => {
    const invalidBody = {
      invalidAttribute: 'Im a invalid attribute',
    };
    const invalidResponse = {
      code: 400,
      status: 400,
      details: {
        entity: 'DemoRequestDto',
        message: '"validAttribute" is required',
      },
      internalCode: 'ENTITY_VALIDATION_ERROR',
      message: 'Entity Validation Failed',
    };
    const res = await request
      .post('/api/v1/demo/validate')
      .send(invalidBody)
      .expect(400);

    expect(res.body).toStrictEqual(invalidResponse);
  });

  it('should return response when call to external client', async () => {
    const expectedResponse = { attribute: 'value' };
    (mockAxios as jest.Mocked<
      typeof mockAxios
    >).get.mockImplementationOnce(() =>
      Promise.resolve({ data: expectedResponse }),
    );

    const res = await request.get('/api/v1/demo/client').expect(200);

    expect(res.body).toStrictEqual(expectedResponse);
  });

  it('should return error when call to external client fails', async () => {
    const expectedResponse = {
      code: 500,
      status: 500,
      internalCode: 'INTERNAL_SERVER_ERROR',
      message: 'Internal Server Error',
    };
    (mockAxios as jest.Mocked<
      typeof mockAxios
    >).get.mockImplementationOnce(() =>
      Promise.reject({ data: expectedResponse }),
    );

    const res = await request.get('/api/v1/demo/client').expect(500);

    expect(res.body).toStrictEqual(expectedResponse);
  });
});

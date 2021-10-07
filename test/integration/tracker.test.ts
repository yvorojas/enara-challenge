import supertest from 'supertest';
import mockAxios from 'axios';
import server from '../../src';
import { connect, closeDatabase } from './mocks/mongo';

describe('Tracker integration tests', () => {
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

  it('should get project name when call to start endpoint', async () => {
    const res = await request.post('/api/v1/tracker/project/start').expect(200);

    expect(res.body).toStrictEqual('project');
  });
});

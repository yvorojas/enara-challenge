import supertest from 'supertest';
import server from '../../src';
import mockMongo from './mocks/mongo';

describe('Tracker integration tests', () => {
  const request = supertest(server);

  beforeAll(async () => await mockMongo.connect());
  afterEach(async () => await mockMongo.clearDatabase());
  afterAll(async done => {
    await mockMongo.closeDatabase();
    server.close();
    done();
  });

  it('should get successfull message when call to start endpoint', async () => {
    const project = 'project';
    const res = await request
      .post(`/api/v1/tracker/${project}/start`)
      .expect(201);

    expect(res.body).toStrictEqual({
      message: `started new segment for project ${project}`,
    });
  });
});

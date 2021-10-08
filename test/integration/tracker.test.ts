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

  it('should get successfull message when call to stop endpoint', async () => {
    const project = 'project';
    await request.post(`/api/v1/tracker/${project}/start`).expect(201);

    const res = await request
      .post(`/api/v1/tracker/${project}/stop`)
      .expect(201);

    expect(res.body.message).toStrictEqual(
      `stopped new segment for project ${project}`,
    );
    expect(res.body.duration).not.toBeNull();
  });

  it('should get full report when call to report endpoint without send project name as a url parameter', async () => {
    const firstProject = 'project';
    const secondProject = 'project-2';
    const thirdProject = 'project-3';
    await request.post(`/api/v1/tracker/${firstProject}/start`).expect(201);
    await request.post(`/api/v1/tracker/${firstProject}/stop`).expect(201);
    await request.post(`/api/v1/tracker/${secondProject}/start`).expect(201);
    await request.post(`/api/v1/tracker/${secondProject}/stop`).expect(201);
    await request.post(`/api/v1/tracker/${secondProject}/start`).expect(201);
    await request.post(`/api/v1/tracker/${secondProject}/stop`).expect(201);
    await request.post(`/api/v1/tracker/${firstProject}/start`).expect(201);
    await request.post(`/api/v1/tracker/${thirdProject}/start`).expect(201);

    const res = await request.get(`/api/v1/tracker/report`).expect(200);

    expect(res.body.length).toBe(2);
    expect(res.body[0].name).toBe(firstProject);
    expect(res.body[1].name).toBe(secondProject);
    expect(res.body[0].duration).not.toBeNull();
    expect(res.body[1].duration).not.toBeNull();
  });

  it('should get report by project when call to report endpoint sending project name as a url parameter', async () => {
    const firstProject = 'project';
    await request.post(`/api/v1/tracker/${firstProject}/start`).expect(201);
    await request.post(`/api/v1/tracker/${firstProject}/stop`).expect(201);
    await request.post(`/api/v1/tracker/${firstProject}/start`).expect(201);

    const res = await request
      .get(`/api/v1/tracker/${firstProject}/report/`)
      .expect(200);

    expect(res.body.name).toBe(firstProject);
    expect(res.body.segments.length).toBe(1);
  });
});

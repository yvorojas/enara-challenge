import TrackerRepository from '../../../../../src/domains/tracker/repositories/tracker';

const mockFind = jest.fn();
const mockCreate = jest.fn();
const mockUpdate = jest.fn();

jest.mock(
  '../../../../../src/domains/tracker/repositories/schemas/project',
  () => () => ({
    getModel: () => ({
      findOne: async params => mockFind(params),
      find: async () => mockFind(),
      create: async params => mockCreate(params),
      updateOne: async (query, document) => mockUpdate(query, document),
    }),
  }),
);

describe('tracker repository tests', () => {
  const trackerRepository = new TrackerRepository();
  beforeAll(() => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date(2021, 10, 7));
  });
  beforeEach(() => {
    mockFind.mockClear();
    mockFind.mockReset();
    mockCreate.mockClear();
    mockCreate.mockReset();
    mockUpdate.mockClear();
    mockUpdate.mockReset();
  });
  afterAll(() => {
    jest.useRealTimers();
  });
  it('should call to schema find one method when call to find project by property method', async () => {
    const name = 'project';
    const project = {
      name,
      segments: [
        {
          startedAt: new Date().toISOString(),
        },
      ],
      status: 'STARTED',
    };
    mockFind.mockResolvedValueOnce(project);

    const response = await trackerRepository.findProjectByProperty(
      'name',
      name,
    );

    expect(response).toStrictEqual(project);
    expect(mockFind).toHaveBeenCalledTimes(1);
    expect(mockFind).toHaveBeenCalledWith({ name });
  });

  it('should call to schema find method when call to find all method', async () => {
    const projects = [
      {
        segments: [
          {
            startedAt: '2021-10-07T20:30:56.336Z',
            endedAt: '2021-10-07T20:36:21.958Z',
            timelapse: 325622,
          },
          {
            startedAt: '2021-10-07T20:36:32.028Z',
          },
        ],
        name: 'my-first-project',
        status: 'STARTED',
      },
      {
        segments: [
          {
            startedAt: '2021-10-07T20:36:39.047Z',
          },
        ],
        name: 'my-second-project',
        status: 'STARTED',
      },
    ];
    mockFind.mockResolvedValueOnce(projects);

    const response = await trackerRepository.findAll();

    expect(response).toStrictEqual(projects);
    expect(mockFind).toHaveBeenCalledTimes(1);
    expect(mockFind).toHaveBeenCalledWith();
  });

  it('should call to schema create method when call to create new project method', async () => {
    const name = 'project';
    const project = {
      name,
      segments: [
        {
          startedAt: new Date().toISOString(),
        },
      ],
      status: 'STARTED',
    };
    mockCreate.mockResolvedValueOnce(project);

    const response = await trackerRepository.createNewProject(name);

    expect(response).toStrictEqual(project);
    expect(mockCreate).toHaveBeenCalledTimes(1);
    expect(mockCreate).toHaveBeenCalledWith(project);
  });

  it('should call to schema update method when call to update project with new segment method', async () => {
    const name = 'project';
    const projectToUpdate = {
      name,
      segments: [
        {
          startedAt: new Date().toISOString(),
          endedAt: new Date().toISOString(),
          timelapse: 1231,
        },
      ],
      status: 'FINISHED',
    };
    const expectedResponse = {
      name,
      segments: [
        {
          startedAt: new Date().toISOString(),
          endedAt: new Date().toISOString(),
          timelapse: 1231,
        },
        {
          startedAt: new Date().toISOString(),
        },
      ],
      status: 'STARTED',
    };
    mockUpdate.mockResolvedValueOnce(expectedResponse);

    const response = await trackerRepository.updateProjectWithNewSegment(
      projectToUpdate,
    );

    expect(response).toStrictEqual(expectedResponse);
    expect(mockUpdate).toHaveBeenCalledTimes(1);
    expect(mockUpdate).toHaveBeenCalledWith(
      { name },
      {
        segments: [
          ...projectToUpdate.segments,
          {
            startedAt: new Date().toISOString(),
          },
        ],
        status: 'STARTED',
      },
    );
  });

  it('should call to schema update method when call to stop segment method', async () => {
    const startedAt = new Date().toISOString();
    jest.setSystemTime(new Date(2021, 10, 8));
    const endedAt = new Date().toISOString();
    const name = 'project';
    const projectToUpdate = {
      name,
      segments: [
        {
          startedAt,
          endedAt,
          timelapse: 86400000,
        },
        {
          startedAt,
        },
      ],
      status: 'STARTED',
    };
    const expectedResponse = {
      name,
      segments: [
        {
          startedAt,
          endedAt,
          timelapse: 86400000,
        },
        {
          startedAt,
          endedAt,
          timelapse: 86400000,
        },
      ],
      status: 'FINISHED',
    };
    mockUpdate.mockResolvedValueOnce(expectedResponse);

    const response = await trackerRepository.stopSegment(projectToUpdate);

    expect(response).toStrictEqual(86400000);
    expect(mockUpdate).toHaveBeenCalledTimes(1);
    expect(mockUpdate).toHaveBeenCalledWith(
      { name },
      {
        segments: [...expectedResponse.segments],
        status: 'FINISHED',
      },
    );
  });
});

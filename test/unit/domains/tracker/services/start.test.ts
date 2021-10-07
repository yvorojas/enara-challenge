import StartPendingProjectException from '../../../../../src/domains/tracker/exceptions/StartPendingProjectException';
import StartSegmentUseCase from '../../../../../src/domains/tracker/services/start';

const mockedFindFunction = jest.fn();
const mockedCreateFunction = jest.fn();
const mockedUpdateFunction = jest.fn();

jest.mock('../../../../../src/domains/tracker/repositories/tracker', () =>
  jest.fn().mockImplementation(() => ({
    findProjectByProperty: async (property, value) =>
      mockedFindFunction(property, value),
    createNewProject: async name => mockedCreateFunction(name),
    updateProjectWithNewSegment: async project => mockedUpdateFunction(project),
  })),
);

describe('start segment use case tests', () => {
  const startSegmentUseCase = new StartSegmentUseCase();
  beforeEach(() => {
    mockedFindFunction.mockClear();
    mockedFindFunction.mockReset();
    mockedCreateFunction.mockClear();
    mockedCreateFunction.mockReset();
    mockedUpdateFunction.mockClear();
    mockedUpdateFunction.mockReset();
  });

  it('should call to repository create new project when project does not exists in database', async () => {
    const project = 'project';
    mockedFindFunction.mockResolvedValueOnce(null);

    await startSegmentUseCase.execute(project);

    expect(mockedFindFunction).toHaveBeenCalledTimes(1);
    expect(mockedFindFunction).toHaveBeenCalledWith('name', project);
    expect(mockedCreateFunction).toHaveBeenCalledTimes(1);
    expect(mockedCreateFunction).toHaveBeenCalledWith(project);
  });

  it('should call to repository update with new segment when there is a project with the sended name in database and it status is FINISHED', async () => {
    const name = 'project';
    const project = {
      name,
      segments: [
        {
          startedAt: new Date().toISOString(),
          endedAt: new Date().toISOString(),
          timelapse: 14386,
        },
      ],
      status: 'FINISHED',
    };
    mockedFindFunction.mockResolvedValueOnce(project);

    await startSegmentUseCase.execute(name);

    expect(mockedFindFunction).toHaveBeenCalledTimes(1);
    expect(mockedFindFunction).toHaveBeenCalledWith('name', name);
    expect(mockedCreateFunction).toHaveBeenCalledTimes(0);
    expect(mockedUpdateFunction).toHaveBeenCalledTimes(1);
    expect(mockedUpdateFunction).toHaveBeenCalledWith(project);
  });

  it('should throw exception when trying to start a project already started', async () => {
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
    mockedFindFunction.mockResolvedValueOnce(project);

    await expect(startSegmentUseCase.execute(name)).rejects.toStrictEqual(
      new StartPendingProjectException(name),
    );

    expect(mockedFindFunction).toHaveBeenCalledTimes(1);
    expect(mockedFindFunction).toHaveBeenCalledWith('name', name);
    expect(mockedCreateFunction).toHaveBeenCalledTimes(0);
    expect(mockedUpdateFunction).toHaveBeenCalledTimes(0);
  });
});

import ProjectNotFoundException from '../../../../../src/domains/tracker/exceptions/ProjectNotFoundException';
import StopFinishedProjectException from '../../../../../src/domains/tracker/exceptions/StopFinishedProjectException';
import StopSegmentUseCase from '../../../../../src/domains/tracker/services/stop';

const mockedFindFunction = jest.fn();
const mockedUpdateFunction = jest.fn();

jest.mock('../../../../../src/domains/tracker/repositories/tracker', () =>
  jest.fn().mockImplementation(() => ({
    findProjectByProperty: async (property, value) =>
      mockedFindFunction(property, value),
    stopSegment: async project => mockedUpdateFunction(project),
  })),
);

describe('stop segment use case tests', () => {
  const stopSegmentUseCase = new StopSegmentUseCase();
  beforeEach(() => {
    mockedFindFunction.mockClear();
    mockedFindFunction.mockReset();
    mockedUpdateFunction.mockClear();
    mockedUpdateFunction.mockReset();
  });

  it('should throw exception when project does not exists in database', async () => {
    const project = 'project';
    mockedFindFunction.mockResolvedValueOnce(null);

    await expect(stopSegmentUseCase.execute(project)).rejects.toStrictEqual(
      new ProjectNotFoundException(project),
    );

    expect(mockedFindFunction).toHaveBeenCalledTimes(1);
    expect(mockedFindFunction).toHaveBeenCalledWith('name', project);
    expect(mockedUpdateFunction).toHaveBeenCalledTimes(0);
  });

  it('should call to repository update with new segment when there is a project with the sended name in database and it status is STARTED', async () => {
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
    mockedUpdateFunction.mockResolvedValueOnce(123123);

    const timelapse = await stopSegmentUseCase.execute(name);

    expect(timelapse).toStrictEqual(123123);
    expect(mockedFindFunction).toHaveBeenCalledTimes(1);
    expect(mockedFindFunction).toHaveBeenCalledWith('name', name);
    expect(mockedUpdateFunction).toHaveBeenCalledTimes(1);
    expect(mockedUpdateFunction).toHaveBeenCalledWith(project);
  });

  it('should throw exception when trying to stop a project already finished', async () => {
    const name = 'project';
    const project = {
      name,
      segments: [
        {
          startedAt: new Date().toISOString(),
          endedAt: new Date().toISOString(),
          timelapse: 123123,
        },
      ],
      status: 'FINISHED',
    };
    mockedFindFunction.mockResolvedValueOnce(project);

    await expect(stopSegmentUseCase.execute(name)).rejects.toStrictEqual(
      new StopFinishedProjectException(name),
    );

    expect(mockedFindFunction).toHaveBeenCalledTimes(1);
    expect(mockedFindFunction).toHaveBeenCalledWith('name', name);
    expect(mockedUpdateFunction).toHaveBeenCalledTimes(0);
  });
});

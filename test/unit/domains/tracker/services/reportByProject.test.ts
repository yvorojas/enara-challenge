import ProjectNotFoundException from '../../../../../src/domains/tracker/exceptions/ProjectNotFoundException';
import ReportByProjectUseCase from '../../../../../src/domains/tracker/services/reportByProject';

const mockedFindFunction = jest.fn();

jest.mock('../../../../../src/domains/tracker/repositories/tracker', () =>
  jest.fn().mockImplementation(() => ({
    findProjectByProperty: async (property, value) =>
      mockedFindFunction(property, value),
  })),
);

describe('report use case tests', () => {
  const reportByProjectUseCase = new ReportByProjectUseCase();
  beforeEach(() => {
    mockedFindFunction.mockClear();
    mockedFindFunction.mockReset();
  });

  it('should call to find one method filter unfinished segments', async () => {
    const name = 'my-first-project';
    mockedFindFunction.mockResolvedValueOnce({
      segments: [
        {
          startedAt: '2021-10-07T17:06:21.110Z',
          endedAt: '2021-10-07T17:06:50.629Z',
          timelapse: 29519,
        },
        {
          startedAt: '2021-10-07T17:06:57.684Z',
          endedAt: '2021-10-07T17:07:04.652Z',
          timelapse: 6968,
        },
        {
          startedAt: '2021-10-07T18:13:47.999Z',
        },
      ],
      name,
      status: 'STARTED',
    });

    const report = await reportByProjectUseCase.execute(name);

    expect(mockedFindFunction).toHaveBeenCalledTimes(1);
    expect(mockedFindFunction).toHaveBeenCalledWith('name', name);
    expect(report).toStrictEqual({
      name: 'my-first-project',
      segments: ['29.519 seconds', '6.968 seconds'],
      totalDuration: '36.487 seconds',
    });
  });

  it('should call to find one method with the same segments', async () => {
    const name = 'my-first-project';
    mockedFindFunction.mockResolvedValueOnce({
      segments: [
        {
          startedAt: '2021-10-07T17:06:21.110Z',
          endedAt: '2021-10-07T17:06:50.629Z',
          timelapse: 29519,
        },
        {
          startedAt: '2021-10-07T17:06:57.684Z',
          endedAt: '2021-10-07T17:07:04.652Z',
          timelapse: 6968,
        },
      ],
      name,
      status: 'FINISHED',
    });

    const report = await reportByProjectUseCase.execute(name);

    expect(mockedFindFunction).toHaveBeenCalledTimes(1);
    expect(mockedFindFunction).toHaveBeenCalledWith('name', name);
    expect(report).toStrictEqual({
      name: 'my-first-project',
      segments: ['29.519 seconds', '6.968 seconds'],
      totalDuration: '36.487 seconds',
    });
  });

  it('should return empty object when project searched does not have ended segments', async () => {
    const name = 'my-first-project';
    mockedFindFunction.mockResolvedValueOnce({
      segments: [
        {
          startedAt: '2021-10-07T17:06:21.110Z',
        },
      ],
      name,
      status: 'STARTED',
    });

    const report = await reportByProjectUseCase.execute(name);

    expect(mockedFindFunction).toHaveBeenCalledTimes(1);
    expect(mockedFindFunction).toHaveBeenCalledWith('name', name);
    expect(report).toStrictEqual({});
  });

  it('should throw exception when trying to get a unknown project report', async () => {
    const name = 'unknown-project';
    mockedFindFunction.mockResolvedValueOnce(null);

    await expect(reportByProjectUseCase.execute(name)).rejects.toStrictEqual(
      new ProjectNotFoundException(name),
    );
    expect(mockedFindFunction).toHaveBeenCalledTimes(1);
    expect(mockedFindFunction).toHaveBeenCalledWith('name', name);
  });
});

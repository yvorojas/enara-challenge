import ReportUseCase from '../../../../../src/domains/tracker/services/report';

const mockedFindFunction = jest.fn();

jest.mock('../../../../../src/domains/tracker/repositories/tracker', () =>
  jest.fn().mockImplementation(() => ({
    findAll: async () => mockedFindFunction(),
  })),
);

describe('report use case tests', () => {
  const reportUseCase = new ReportUseCase();
  beforeEach(() => {
    mockedFindFunction.mockClear();
    mockedFindFunction.mockReset();
  });

  it('should call to find all method', async () => {
    mockedFindFunction.mockResolvedValueOnce([
      {
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
        name: 'my-first-project',
        status: 'STARTED',
      },
      {
        segments: [
          {
            startedAt: '2021-10-07T17:07:24.715Z',
            endedAt: '2021-10-07T17:07:29.787Z',
            timelapse: 5072,
          },
        ],
        name: 'my-second-project',
        status: 'FINISHED',
      },
    ]);

    const report = await reportUseCase.execute();

    expect(mockedFindFunction).toHaveBeenCalledTimes(1);
    expect(mockedFindFunction).toHaveBeenCalledWith();
    expect(report).toStrictEqual([
      { duration: '36.487 seconds', name: 'my-first-project' },
      { duration: '5.072 seconds', name: 'my-second-project' },
    ]);
  });

  it('should return empty array in report when does not exists project with ended segments', async () => {
    mockedFindFunction.mockResolvedValueOnce([
      {
        segments: [
          {
            startedAt: '2021-10-07T17:06:21.110Z',
          },
        ],
        name: 'my-first-project',
        status: 'STARTED',
      },
      {
        segments: [
          {
            startedAt: '2021-10-07T17:07:24.715Z',
          },
        ],
        name: 'my-second-project',
        status: 'STARTED',
      },
    ]);

    const report = await reportUseCase.execute();

    expect(mockedFindFunction).toHaveBeenCalledTimes(1);
    expect(mockedFindFunction).toHaveBeenCalledWith();
    expect(report).toStrictEqual([]);
  });
});

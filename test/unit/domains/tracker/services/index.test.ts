import { mocked } from 'ts-jest/utils';
import TrackerUseCases from '../../../../../src/domains/tracker/services';
import StartSegmentUseCase from '../../../../../src/domains/tracker/services/start';
import StopSegmentUseCase from '../../../../../src/domains/tracker/services/stop';
import ReportUseCase from '../../../../../src/domains/tracker/services/report';
import ReportByProjectUseCase from '../../../../../src/domains/tracker/services/reportByProject';
import fullReport from '../mocks/fullReport.json';
import reportByProject from '../mocks/reportByProject.json';

const mockedStartFunction = jest.fn();
const mockedStopFunction = jest.fn();
const mockedReportFunction = jest.fn();

jest.mock('../../../../../src/domains/tracker/services/start', () =>
  jest.fn().mockImplementation(() => ({
    execute: mockedStartFunction,
  })),
);

jest.mock('../../../../../src/domains/tracker/services/stop', () =>
  jest.fn().mockImplementation(() => ({
    execute: mockedStopFunction,
  })),
);

jest.mock('../../../../../src/domains/tracker/services/report', () =>
  jest.fn().mockImplementation(() => ({
    execute: mockedReportFunction,
  })),
);

jest.mock('../../../../../src/domains/tracker/services/reportByProject', () =>
  jest.fn().mockImplementation(() => ({
    execute: mockedReportFunction,
  })),
);

describe('tracker use cases test', () => {
  const trackerUseCases = new TrackerUseCases();
  const mockedStartSegmentUseCase = mocked(StartSegmentUseCase, true);
  const mockedStopSegmentUseCase = mocked(StopSegmentUseCase, true);
  const mockedReportUserCase = mocked(ReportUseCase, true);
  const mockedReportByProjectUserCase = mocked(ReportByProjectUseCase, true);
  beforeEach(() => {
    mockedStartFunction.mockClear();
    mockedStartFunction.mockReset();
    mockedStopFunction.mockClear();
    mockedStopFunction.mockReset();
    mockedReportFunction.mockClear();
    mockedReportFunction.mockReset();
  });
  it('should execute start segment use case when call to start segment method', async () => {
    const project = 'project';
    mockedStartFunction.mockResolvedValue(true);

    const response = await trackerUseCases.startSegment(project);

    expect(mockedStartSegmentUseCase).toHaveBeenCalledTimes(1);
    expect(mockedStartFunction).toBeCalledWith(project);
    expect(response).toStrictEqual(true);
  });

  it('should execute stop segment use case when call to stop segment method', async () => {
    const project = 'project';
    mockedStopFunction.mockResolvedValue(true);

    const response = await trackerUseCases.stopSegment(project);

    expect(mockedStopSegmentUseCase).toHaveBeenCalledTimes(1);
    expect(mockedStopFunction).toBeCalledWith(project);
    expect(response).toStrictEqual(true);
  });

  it('should execute report use case when call to get full report method', async () => {
    mockedReportFunction.mockResolvedValueOnce(fullReport);

    const response = await trackerUseCases.getFullReport();

    expect(mockedReportUserCase).toHaveBeenCalledTimes(1);
    expect(mockedReportFunction).toBeCalledWith();
    expect(response).toStrictEqual(fullReport);
  });

  it('should execute report by project use case when call to get report by project method', async () => {
    const project = 'my-first-project';
    mockedReportFunction.mockResolvedValueOnce(reportByProject);

    const response = await trackerUseCases.getProjectReport(project);

    expect(mockedReportByProjectUserCase).toHaveBeenCalledTimes(1);
    expect(mockedReportFunction).toBeCalledWith(project);
    expect(response).toStrictEqual(reportByProject);
  });
});

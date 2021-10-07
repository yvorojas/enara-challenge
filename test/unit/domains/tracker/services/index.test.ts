import { mocked } from 'ts-jest/utils';
import TrackerUseCases from '../../../../../src/domains/tracker/services';
import StartSegmentUseCase from '../../../../../src/domains/tracker/services/start';
import StopSegmentUseCase from '../../../../../src/domains/tracker/services/stop';

const mockedStartFunction = jest.fn();
const mockedStopFunction = jest.fn();

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

describe('tracker use cases test', () => {
  const trackerUseCases = new TrackerUseCases();
  const mockedStartSegmentUseCase = mocked(StartSegmentUseCase, true);
  const mockedStopSegmentUseCase = mocked(StopSegmentUseCase, true);
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
});

import { mocked } from 'ts-jest/utils';
import TrackerUseCases from '../../../../../src/domains/tracker/services';
import StartSegmentUseCase from '../../../../../src/domains/tracker/services/start';

const mockedStartFunction = jest.fn();

jest.mock('../../../../../src/domains/tracker/services/start', () =>
  jest.fn().mockImplementation(() => ({
    execute: mockedStartFunction,
  })),
);

describe('tracker use cases test', () => {
  const trackerUseCases = new TrackerUseCases();
  const mockedStartSegmentUseCase = mocked(StartSegmentUseCase, true);
  it('should execute start segment use case when call to start segment method', async () => {
    const project = 'project';
    mockedStartFunction.mockResolvedValue(true);

    const response = await trackerUseCases.startSegment(project);

    expect(mockedStartSegmentUseCase).toHaveBeenCalledTimes(1);
    expect(mockedStartFunction).toBeCalledWith(project);
    expect(response).toStrictEqual(true);
  });
});

import StartSegmentUseCase from './start';

export default class TrackerUseCases {
  public startSegment = async (projectName: string) =>
    new StartSegmentUseCase().execute(projectName);
}

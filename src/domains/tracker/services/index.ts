import StartSegmentUseCase from './start';
import StopSegmentUseCase from './stop';

export default class TrackerUseCases {
  public startSegment = async (projectName: string) =>
    new StartSegmentUseCase().execute(projectName);

  public stopSegment = async (projectName: string) =>
    new StopSegmentUseCase().execute(projectName);
}

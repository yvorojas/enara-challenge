import StartSegmentUseCase from './start';
import StopSegmentUseCase from './stop';
import ReportUseCase from './report';
import ReportByProjectUseCase from './reportByProject';

export default class TrackerUseCases {
  public startSegment = async (projectName: string) =>
    new StartSegmentUseCase().execute(projectName);

  public stopSegment = async (projectName: string) =>
    new StopSegmentUseCase().execute(projectName);

  public getFullReport = async () => new ReportUseCase().execute();

  public getProjectReport = async project =>
    new ReportByProjectUseCase().execute(project);
}

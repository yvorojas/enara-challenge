import ProjectNotFoundException from '../exceptions/ProjectNotFoundException';
import StopFinishedProjectException from '../exceptions/StopFinishedProjectException';
import TrackerRepository from '../repositories/tracker';

export default class StopSegmentUseCase {
  private trackerRepository: TrackerRepository;
  constructor() {
    this.trackerRepository = new TrackerRepository();
  }
  public execute = async (projectName: string) => {
    const project = await this.trackerRepository.findProjectByProperty(
      'name',
      projectName,
    );
    if (!project) {
      throw new ProjectNotFoundException(projectName);
    }
    return await this.stopSegment(project);
  };

  private stopSegment = async project => {
    if (project.status === 'FINISHED') {
      throw new StopFinishedProjectException(project.name);
    }
    return await this.trackerRepository.stopSegment(project);
  };
}

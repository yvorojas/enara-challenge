import StartPendingProjectException from '../exceptions/StartPendingProjectException';
import TrackerRepository from '../repositories/tracker';

export default class StartSegmentUseCase {
  private trackerRepository: TrackerRepository;
  constructor() {
    this.trackerRepository = new TrackerRepository();
  }
  public execute = async (projectName: string) => {
    const project = await this.trackerRepository.findProjectByProperty(
      'name',
      projectName,
    );
    !project
      ? await this.trackerRepository.createNewProject(projectName)
      : await this.processExistingProject(project);
  };

  private processExistingProject = async project => {
    if (project.status === 'STARTED') {
      throw new StartPendingProjectException(project.name);
    }
    this.trackerRepository.updateProjectWithNewSegment(project);
  };
}

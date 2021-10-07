import {
  calculateTimelapse,
  getDuration,
} from '../../../infrastructure/common/parsers';
import ProjectNotFoundException from '../exceptions/ProjectNotFoundException';
import TrackerRepository from '../repositories/tracker';

export default class ReportByProjectUseCase {
  private trackerRepository: TrackerRepository;
  constructor() {
    this.trackerRepository = new TrackerRepository();
  }
  public execute = async name => {
    const project = await this.trackerRepository.findProjectByProperty(
      'name',
      name,
    );
    if (!project) {
      throw new ProjectNotFoundException(name);
    }

    const segmentsToRetrieve =
      project.status === 'FINISHED'
        ? project.segments
        : project.segments.filter(segment => segment.endedAt);
    return segmentsToRetrieve.length === 0
      ? {}
      : {
          name: project.name,
          totalDuration: this.calculateTotalDuration(segmentsToRetrieve),
          segments: segmentsToRetrieve.map(({ timelapse }) =>
            getDuration(timelapse),
          ),
        };
  };

  private calculateTotalDuration = segments => {
    const totalTimelapse = segments.reduce(
      (result, segment) =>
        result + calculateTimelapse(segment.startedAt, segment.endedAt),
      0,
    );
    return getDuration(totalTimelapse);
  };
}

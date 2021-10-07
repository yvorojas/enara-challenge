import {
  calculateTimelapse,
  getDuration,
} from '../../../infrastructure/common/parsers';
import TrackerRepository from '../repositories/tracker';

export default class ReportUseCase {
  private trackerRepository: TrackerRepository;
  constructor() {
    this.trackerRepository = new TrackerRepository();
  }
  public execute = async () => {
    const projects = await this.trackerRepository.findAll();
    return projects
      .map(project => {
        const segmentsToRetrieve =
          project.status === 'FINISHED'
            ? project.segments
            : project.segments.filter(segment => segment.endedAt);

        return segmentsToRetrieve.length === 0
          ? null
          : {
              name: project.name,
              duration: this.calculateTotalDuration(segmentsToRetrieve),
            };
      })
      .filter(project => project != null);
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

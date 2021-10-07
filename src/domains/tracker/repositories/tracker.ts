import ProjectModel, { IProject } from './schemas/project';
import { Model } from 'mongoose';
import { calculateTimelapse } from '../../../infrastructure/common/parsers';

export default class TrackerRepository {
  private model: Model<IProject>;
  constructor() {
    this.model = new ProjectModel().getModel();
  }
  public findProjectByProperty = async (property, value) =>
    await this.model.findOne({
      [property]: value,
    });

  public findAll = async () => await this.model.find();

  public createNewProject = async name => {
    const newProject = {
      name,
      segments: [
        {
          startedAt: new Date().toISOString(),
        },
      ],
      status: 'STARTED',
    };

    return await this.model.create(newProject);
  };

  public updateProjectWithNewSegment = async project =>
    await this.model.updateOne(
      { name: project.name },
      {
        segments: [
          ...project.segments,
          {
            startedAt: new Date().toISOString(),
          },
        ],
        status: 'STARTED',
      },
    );

  public stopSegment = async project => {
    let finishedSegment;
    await this.model.updateOne(
      { name: project.name },
      {
        segments: project.segments.map(segment => {
          if (!segment.endedAt) {
            finishedSegment = this.finishSegment(segment);
            return finishedSegment;
          }
          return segment;
        }),
        status: 'FINISHED',
      },
    );
    return finishedSegment.timelapse;
  };

  private finishSegment = ({ startedAt }) => {
    const endedAt = new Date().toISOString();
    return {
      startedAt,
      endedAt,
      timelapse: calculateTimelapse(startedAt, endedAt),
    };
  };
}

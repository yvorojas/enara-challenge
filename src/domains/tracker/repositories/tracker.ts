import ProjectModel, { IProject } from './schemas/project';
import { Model } from 'mongoose';

export default class TrackerRepository {
  private model: Model<IProject>;
  constructor() {
    this.model = new ProjectModel().getModel();
  }
  public findProjectByProperty = async (property, value) =>
    await this.model.findOne({
      [property]: value,
    });

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
}

import { Request, Response } from 'express';
import MissingProjectNameException from '../exceptions/MissingProjectNameException';
import TrackerUseCases from '../services';

export default class TrackerController {
  public start = async (request: Request, response: Response) => {
    const projectName: string = request.params.project;
    if (!projectName || projectName.trim() === '') {
      throw new MissingProjectNameException();
    }
    await new TrackerUseCases().startSegment(projectName);

    response
      .status(201)
      .json({ message: `started new segment for project ${projectName}` });
  };

  public stop = async (request: Request, response: Response) => {
    const projectName: string = request.params.project;
    if (!projectName || projectName.trim() === '') {
      throw new MissingProjectNameException();
    }
    const timelapse = await new TrackerUseCases().stopSegment(projectName);

    response.status(201).json({
      message: `stopped new segment for project ${projectName}`,
      duration: this.calculateTimelapse(timelapse),
    });
  };

  private calculateTimelapse = timelapse =>
    timelapse > 60e3
      ? `${Math.floor(timelapse / 60e3)} minutes`
      : `${Math.floor(timelapse / 1e3)} seconds`;
}

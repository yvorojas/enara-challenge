import { Request, Response } from 'express';
import { getDuration } from '../../../infrastructure/common/parsers';
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
      message: `stopped segment for project ${projectName}`,
      duration: getDuration(timelapse),
    });
  };

  public report = async (request: Request, response: Response) => {
    const trackerUseCases = new TrackerUseCases();
    const projectName: string = request.params.project;
    const report =
      !projectName || projectName.trim() === ''
        ? await trackerUseCases.getFullReport()
        : await trackerUseCases.getProjectReport(projectName);

    response.status(200).json(report);
  };
}

import { Request, Response } from 'express';
import MissingProjectNameException from '../exceptions/MissingProjectNameException';
import TrackerUseCases from '../services';

export default class TrackerController {
  public start = async (request: Request, response: Response) => {
    const projectName: string = request.params.project;
    if (!projectName || projectName.trim() === '') {
      throw new MissingProjectNameException();
    }
    new TrackerUseCases().startSegment(projectName);
    response
      .status(201)
      .json({ message: `started new segment for project ${projectName}` });
  };
}

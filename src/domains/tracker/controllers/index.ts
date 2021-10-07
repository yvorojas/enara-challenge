import { Request, Response } from 'express';
import MissingProjectNameException from '../exceptions/MissingProjectNameException';

export default class DemoController {
  public start = async (request: Request, response: Response) => {
    const projectName: string = request.params.project;
    if (!projectName || projectName.trim() === '') {
      throw new MissingProjectNameException();
    }

    response.status(200).json(projectName);
  };
}

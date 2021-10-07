import DemoUseCases from '../services';
import { Request, Response } from 'express';
import DemoRequestDto from '../entities/dtos/demoRequestDto';

export default class DemoController {
  public getInfo = async (request: Request, response: Response) => {
    const demoUseCases = new DemoUseCases();
    const info = await demoUseCases.getInfo();
    response.status(200).json(info);
  };

  public validateEntity = (request: Request, response: Response) => {
    const entity = new DemoRequestDto(request.body);
    response.status(201).json(entity);
  };

  public callToClient = async (request: Request, response: Response) => {
    const demoUseCases = new DemoUseCases();
    const serviceResponse = await demoUseCases.getInfoFromClient();
    response.status(200).json(serviceResponse);
  };
}

import { Request } from 'express';
import TrackerController from '../../../../../src/domains/tracker/controllers';
import MissingProjectNameException from '../../../../../src/domains/tracker/exceptions/MissingProjectNameException';

describe('tracker controller test', () => {
  it('should return project name when it is send via url param', async () => {
    const project = 'projectName';
    const response: any = {
      json: jest.fn(),
    };
    response.status = jest.fn().mockReturnValue(response);

    const request = {
      params: {
        project,
      },
      body: {},
    } as any;

    const controller = new TrackerController();

    await controller.start(request, response);

    expect(response.status).toHaveBeenCalledTimes(1);
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith(project);
  });

  it('should return exception when project url param is null', async () => {
    const response: any = {
      json: jest.fn(),
    };
    response.status = jest.fn().mockReturnValue(response);

    const request = {
      params: {
        project: null,
      },
      body: {},
    } as any;

    const controller = new TrackerController();

    await expect(controller.start(request, response)).rejects.toStrictEqual(
      new MissingProjectNameException(),
    );
  });
});

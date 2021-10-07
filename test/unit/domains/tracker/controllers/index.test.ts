import TrackerController from '../../../../../src/domains/tracker/controllers';
import MissingProjectNameException from '../../../../../src/domains/tracker/exceptions/MissingProjectNameException';

jest.mock('../../../../../src/domains/tracker/services/index', () =>
  jest.fn().mockImplementation(() => ({
    startSegment: jest.fn(),
  })),
);

describe('tracker controller test', () => {
  it('should return success message when use case response is successful', async () => {
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
    expect(response.status).toHaveBeenCalledWith(201);
    expect(response.json).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith({
      message: `started new segment for project ${project}`,
    });
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

  it('should return exception when project url param is empty', async () => {
    const response: any = {
      json: jest.fn(),
    };
    response.status = jest.fn().mockReturnValue(response);

    const request = {
      params: {
        project: '',
      },
      body: {},
    } as any;

    const controller = new TrackerController();

    await expect(controller.start(request, response)).rejects.toStrictEqual(
      new MissingProjectNameException(),
    );
  });

  it('should return exception when project url param is whitespaces', async () => {
    const response: any = {
      json: jest.fn(),
    };
    response.status = jest.fn().mockReturnValue(response);

    const request = {
      params: {
        project: '   ',
      },
      body: {},
    } as any;

    const controller = new TrackerController();

    await expect(controller.start(request, response)).rejects.toStrictEqual(
      new MissingProjectNameException(),
    );
  });
});

import TrackerController from '../../../../../src/domains/tracker/controllers';
import MissingProjectNameException from '../../../../../src/domains/tracker/exceptions/MissingProjectNameException';

const mockFunction = jest.fn();

jest.mock('../../../../../src/domains/tracker/services/index', () =>
  jest.fn().mockImplementation(() => ({
    startSegment: mockFunction,
    stopSegment: mockFunction,
  })),
);

describe('tracker controller test', () => {
  beforeEach(() => {
    mockFunction.mockClear();
    mockFunction.mockReset();
  });
  describe('start endpoint', () => {
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

      expect(mockFunction).toHaveBeenCalledTimes(1);
      expect(mockFunction).toHaveBeenCalledWith(project);
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
      expect(mockFunction).toHaveBeenCalledTimes(0);
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
      expect(mockFunction).toHaveBeenCalledTimes(0);
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
      expect(mockFunction).toHaveBeenCalledTimes(0);
    });
  });
  describe('stop endpoint', () => {
    it('should return success message when use case response is successful and duration in minutes', async () => {
      mockFunction.mockResolvedValueOnce(123123);
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

      await controller.stop(request, response);

      expect(mockFunction).toHaveBeenCalledTimes(1);
      expect(mockFunction).toHaveBeenCalledWith(project);
      expect(response.status).toHaveBeenCalledTimes(1);
      expect(response.status).toHaveBeenCalledWith(201);
      expect(response.json).toHaveBeenCalledTimes(1);
      expect(response.json).toHaveBeenCalledWith({
        message: `stopped new segment for project ${project}`,
        duration: '2 minutes',
      });
    });

    it('should return success message when use case response is successful and duration in seconds', async () => {
      mockFunction.mockResolvedValueOnce(12312);
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

      await controller.stop(request, response);

      expect(mockFunction).toHaveBeenCalledTimes(1);
      expect(mockFunction).toHaveBeenCalledWith(project);
      expect(response.status).toHaveBeenCalledTimes(1);
      expect(response.status).toHaveBeenCalledWith(201);
      expect(response.json).toHaveBeenCalledTimes(1);
      expect(response.json).toHaveBeenCalledWith({
        message: `stopped new segment for project ${project}`,
        duration: '12 seconds',
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

      await expect(controller.stop(request, response)).rejects.toStrictEqual(
        new MissingProjectNameException(),
      );
      expect(mockFunction).toHaveBeenCalledTimes(0);
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

      await expect(controller.stop(request, response)).rejects.toStrictEqual(
        new MissingProjectNameException(),
      );
      expect(mockFunction).toHaveBeenCalledTimes(0);
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

      await expect(controller.stop(request, response)).rejects.toStrictEqual(
        new MissingProjectNameException(),
      );
      expect(mockFunction).toHaveBeenCalledTimes(0);
    });
  });
});

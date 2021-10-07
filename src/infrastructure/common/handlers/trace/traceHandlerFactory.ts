import TraceHandler from './traceHandler';

class TraceHandlerFactory {
  private instances;
  constructor() {
    this.instances = [];
  }

  createInstance = id => {
    const instance = new TraceHandler(id);
    this.instances.push({ id, instance });
    return instance;
  };

  getInstanceById = id => {
    const traceHandler = this.instances.find(
      ({ id: instanceId }) => instanceId === id,
    );
    return traceHandler ? traceHandler.instance : null;
  };

  getInstanceByTrackId = id => {
    const traceHandler = this.instances.find(
      ({ instance }) => instance.getTrackId() === id,
    );
    return traceHandler ? traceHandler.instance : null;
  };

  removeInstanceById = id => {
    this.instances = this.instances.filter(
      ({ id: instanceId }) => instanceId !== id,
    );
  };
}

const factory = new TraceHandlerFactory();

export default factory;

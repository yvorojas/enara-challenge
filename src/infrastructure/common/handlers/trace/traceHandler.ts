import { v4 } from 'uuid';

export default class TraceHandler {
  private trackId: string;
  private uniqueId: string;
  private country: string;
  private startPerformanceMeasure: Date;
  private endPerformanceMeasure: Date;

  constructor(id) {
    this.uniqueId = id;
  }

  public startRequestTrace = () => {
    this.startPerformanceMeasure = new Date();
  };

  public endRequestTrace = () => {
    this.endPerformanceMeasure = new Date();
  };

  public getRequestTimelapse = () =>
    this.endPerformanceMeasure.getTime() -
    this.startPerformanceMeasure.getTime();

  public setTrackId = trackId => {
    if (trackId) {
      this.trackId = trackId;
    } else {
      this.trackId = v4();
    }
  };

  public setCountry = country => {
    this.country = country;
  };

  public getTrackId = () => this.trackId;

  public getUniqueId = () => this.uniqueId;

  public getCountry = () => this.country;
}

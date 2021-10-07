import { Document, Model, model, Schema } from 'mongoose';

interface ISegment {
  startedAt: string;
  endedAt?: string;
  timelapse: BigInteger;
}

export interface IProject extends Document {
  name: string;
  segments: ISegment[];
  status: string;
}

const projectSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  segments: {
    type: [],
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

export default class ProjectModel {
  model: Model<IProject>;
  constructor() {
    this.model = model<IProject>('project', projectSchema);
  }

  getModel = () => this.model;
}

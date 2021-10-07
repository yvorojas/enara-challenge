import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const mongod = new MongoMemoryServer();

const connect = async () => {
  const uri = await mongod.getUri();

  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  await mongoose.connect(uri, mongooseOpts);
};

const closeDatabase = async () => {
  mongoose.connection.readyState !== 0 &&
    (await mongoose.connection.dropDatabase());
  await mongoose.connection.close();
  await mongod.stop();
};

const clearDatabase = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.drop();
  }
};

export { connect, closeDatabase, clearDatabase };

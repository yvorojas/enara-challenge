import { ConnectionOptions, connect as connectDB, connection } from 'mongoose';

const connect = async () => {
  try {
    const mongoURI = process.env.MONGOURI;
    const options: ConnectionOptions = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    };
    await connectDB(mongoURI, options);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

Object.values<NodeJS.Signals>(['SIGTERM', 'SIGINT', 'SIGUSR2']).forEach(type =>
  process.once(type, async () => {
    try {
      await connection.close();
    } finally {
      process.kill(process.pid, type);
    }
  }),
);

Object.values(['unhandledRejection', 'uncaughtException']).forEach(type =>
  process.on(type, async () => {
    try {
      await connection.close();
      process.exit(0);
    } catch (_) {
      process.exit(1);
    }
  }),
);

export default connect;

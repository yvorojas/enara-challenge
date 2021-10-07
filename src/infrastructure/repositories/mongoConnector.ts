import { ConnectionOptions, connect as connectDB } from 'mongoose';

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

export default connect;

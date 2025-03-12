import mongoose from "mongoose";

const connectTodb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "humanhr",
    });
    console.log('Mongo db connected')
  } catch (error) {
    console.error(error.message);
    process.exit(1)
  }
};

export default connectTodb;

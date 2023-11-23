import mongoose from "mongoose";
import { DB_NAME } from "../constans.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(connectionInstance);
    console.log(
      `\n MongoDb Connected !! DB HOST : ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB: Connection error: ", error);
    process.exit(1);
  }
};

export default connectDB;

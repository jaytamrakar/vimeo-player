import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js";

dotenv.config({
  path: "./.env",
});

const port = process.env.PORT || 8000;

// Handiling some extra promises for debugging purposes

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`* Server started on port ${port}`);
    });
    app.on("error", (err) => {
      console.log("Something went wrong...", err);
      throw err;
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed!!!", error);
  });

// Code for practice with iffe ()() with db connection

/* 
import mongoose from "mongoose";
import { DB_NAME } from "./constans.js";
import express from "express";
const app = express();

(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);

    app.on("error", (error) => {
      console.log("Error : " + error);
      throw error;
    });

    app.listen(process.env.PORT, () => {
      console.log(`App listening on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("ERROR : " + error);
    throw error;
  }
})();
*/

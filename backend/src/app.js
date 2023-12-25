import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// * add middlawares to the express app

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(
  express.json({
    limit: "16kb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);

app.use(express.static("public")); // * Serve static files from the "public" directory.

app.use(cookieParser()); // * Parse cookies in the request.

// * routes import

import userRouter from "./routes/user.routes.js";

//  * routes declarations

app.use("/api/v1/users", userRouter);

export default app;

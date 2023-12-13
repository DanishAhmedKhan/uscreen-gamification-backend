import mongoose, { ConnectOptions } from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import ip from "ip";
import path from "path";
// Routes
import user from "./src/routes/user.route";

// Add all environment variables
dotenv.config();

const app = express();

process.on("uncaughtException", (err) => {
   console.log("UNCAUGHT EXCEPTION IN NODE PROCESS");
   console.log(err);
   process.exit(1);
});

process.on("unhandledRejection", (err) => {
   console.log("UNHANDLED REJECTION IN THE NODE PROCESS");
   console.log(err);
   process.exit(1);
});

const appMode = process.env.APP_MODE;

const ipAddress = ip.address();
console.log(`Trying to start BMS-Kajabi backend server at ${ipAddress} (in ${appMode} mode)...`);

// Middlewares
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
app.use(cors());

// Development menvironment middlewares
if (appMode === "development") {
   app.use(morgan("tiny"));
}

// Production environment middlewares
if (appMode === "production") {
   app.use(morgan("tiny"));
   app.use(helmet());
}

// File, image, CSS, JS static routing
app.use(express.static(path.join(__dirname, "src/public")));

// Add all api
app.use("/api", user);

// 404 page/api not found
app.use((req, res) => {
   res.status(404).send({ code: 404, msg: "Page not found" });
});

// Connect to the MongoDB Atlas cloud storage
let databaseUrl = "";

if (process.env.APP_MODE === "development") {
   databaseUrl = process.env.DB_URL_DEVELOPMENT;
} else if (process.env.APP_MODE === "production") {
   databaseUrl = process.env.DB_URL_PRODUCTION;
}
console.log(`Trying to connect to mongodb ${databaseUrl}...`);

const mongoDbConfig = {
   serverSelectionTimeoutMS: 5000,
} as ConnectOptions;

mongoose
   .connect(databaseUrl, mongoDbConfig)
   .then(() => {
      console.log("Connected to mongodb.");
      // Start the server
      const port = process.env.PORT || 4400;
      app.listen(port, () => {
         console.log(`Listining to port ${port}.`);
      });
   })
   .catch((err) => console.log("Could not connect to mongodb. Server did not start.", err));

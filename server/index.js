import express from "express";
import "dotenv/config";
import path from "path";
import cors from "cors";
import { errorController } from "./controller/errorController.js";
import mongodb from "./config/db.js";
import router from "./routes/router.js";
// import apicache from "apicache";

const app = express();
// let cache = apicache.middleware;
// app.use(cache("5 minutes"));
const __dirname = path.resolve();

// process.on("uncaughtException", (err) => {
//   console.log("SHUTTING DOWN ");
//   console.log(err.name, err.message);
//   process.exit(1);
// });
// {
//     origin: ["http://localhost:3000"],
//     methods: ["GET", "PUT", "POST", "DELETE", "PATCH"],
//     // credentials: true,
//   }
app.use(cors());

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/jms/app/v1/user", router);

app.get("/", (req, res) => {
  res.json("Hello from jms server");
});

app.all("*", (req, res, next) => {
  res.status(200).json({ message: `${req.originalUrl} is Invalid url` });
  next();
});
app.use(errorController);

mongodb()
  .then(() => {
    app.listen(process.env.PORT, (err) => {
      if (err) console.log(err);
      console.log("JMS server connected on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

// process.on("unhandledRejection", (err) => {
//   console.log("SHUTTING DOWN");
//   console.log(err.message, err.name);
//   server.close(() => {
//     process.exit(1);
//   });
// });

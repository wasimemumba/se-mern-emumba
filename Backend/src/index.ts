import express from "express";
import dotenv from "dotenv";
import { errorHandler, notFound } from "./middleware/errormiddleware";
import connectDB from "./config/db";
import cors from "cors";
import router from "./routes";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.options('*', cors());

const port = process.env.PORT || 5000;

// parse json request body
app.use(express.json());

//routes
app.use(router);

app.get("/", (req, res,next) => {
  res.send("Server is ready");
})

//handle unknow routes
app.use(notFound);

//handle errors
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

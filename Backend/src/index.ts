import express from "express";
import dotenv from "dotenv";
import { errorHandler, notFound } from "./middleware/errormiddleware";
import connectDB from "./config/db";
import cors from "cors";
import router from "./routes";
import routerV2 from "./v2/routes";
import sequelize from "./config/Sequelize";
import { User } from "./v2/model/User";
import { UserToken } from "./v2/model/UserToken";
import { BudgetEntry } from "./v2/model/BudgetEntry";
import "reflect-metadata";
dotenv.config();

connectDB();
sequelize.authenticate()
  .then(() => console.log('Database connected.'))
  .catch(err => console.error('Unable to connect to the database:', err));

(async () => {
  await User.sync({ force: true });
  await UserToken.sync({ force: true });
  await BudgetEntry.sync({ force: true });
})();

const app = express();
app.use(cors());
app.options('*', cors());

const port = process.env.PORT || 5000;

// parse json request body
app.use(express.json());

//routes
app.use(router);
app.use("/v2", routerV2);

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

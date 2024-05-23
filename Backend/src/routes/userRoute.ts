import express from "express";
import {
  getUsers,
  createUser,
  getUserById
} from "../controller/userController";
import validate from "../middleware/validateMiddleware";
import {
  createUserSchema,
  getUserByIdSchema,
} from "../schema/userSchema";
import isAuthenticated from "../middleware/isAuthenticated";
const router = express.Router();

router
  .route("/")
  .get(isAuthenticated, getUsers)
  .post(validate(createUserSchema), createUser); //register user 
router
  .route("/:id")
  .get(validate(getUserByIdSchema), getUserById) // get user by id

export default router;

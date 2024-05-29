import express from "express";
import validate from "../../middleware/validateMiddleware";
import { logInSchema, refreshTokenSchema } from "../../schema/authValidation";
import { login, logout, refreshToken } from "../controller/authController";

const router = express.Router();

router
  .route("/")
  .post(validate(logInSchema),login) // login user 
  .delete(validate(refreshTokenSchema), logout); // logout user

router.route("/refresh").post(validate(refreshTokenSchema), refreshToken); // get new access token by sending a refresh token 

export default router;

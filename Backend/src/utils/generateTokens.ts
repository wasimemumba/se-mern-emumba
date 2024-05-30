import jwt from "jsonwebtoken";
import {UserToken} from "../model/UserToken";
import { User } from '../model/User';

//generate tokens 
const generateTokens = async (user:User): Promise<{ accessToken: string, refreshToken: string }>  => {
  try {
    //Payload for the access token and refresh token
    const payload = { _id: user.id };
    const accessToken = jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_PRIVATE_KEY,
      { expiresIn: "20m" }
    );
    const refreshToken = jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_PRIVATE_KEY,
      { expiresIn: "30d" }
    );

    //check if there is a refresh token for user delete it and create a new one 
    const userToken = await UserToken.findOne({where:{user:{id:user.id}}});
    if (userToken) {
      await UserToken.remove(userToken);
    }

    const newUserToken = new UserToken();
    newUserToken.user = user;
    newUserToken.token = refreshToken;
    await newUserToken.save();

    return { accessToken, refreshToken };

  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

export default generateTokens;

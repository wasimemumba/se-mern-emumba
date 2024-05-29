import jwt from "jsonwebtoken";
import UserToken from "../model/UserToken";


//generate tokens 
const generateTokens = async (user) => {
  try {
    //Payload for the access token and refresh token
    const payload = { _id: user.id, roles: user.roles };
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
    const userToken = await UserToken.findOne({ userId: user._id });
    if (userToken) {
      await UserToken.deleteOne({ _id: userToken._id });
    }

    await new UserToken({ userId: user._id, token: refreshToken }).save();
    return Promise.resolve({ accessToken, refreshToken });
  } catch (err) {
    return Promise.reject(err);
  }
};

export default generateTokens;

import jwt from "jsonwebtoken";
import { UserToken } from "../model/UserToken"; // Assuming Sequelize UserToken model

// generate tokens
const generateTokens = async (user) => {
  try {
    // Payload for the access token and refresh token
    const payload = { _id: user.id, roles: user.roles }; // Using 'id' instead of '_id'
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

    // check if there is a refresh token for user delete it and create a new one 
    const userToken = await UserToken.findOne({ where: { userId: user.id } });
    if (userToken) {
      await userToken.destroy();
    }

    await UserToken.create({ userId: user.id, token: refreshToken });
    return { accessToken, refreshToken };
  } catch (err) {
    console.error(err);
    throw err; // Better to re-throw and let the caller handle it
  }
};

export default generateTokens;

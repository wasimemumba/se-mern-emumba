import { UserToken } from "../model/UserToken"; // Assuming Sequelize UserToken model
import jwt from "jsonwebtoken";
import  RefreshTokenDecoded  from "../../types/RefreshToken"; // Assuming you have a TypeScript type for decoded tokens

const verifyRefreshToken = async (refreshToken: string) => {
  try {
    const privateKey = process.env.REFRESH_TOKEN_PRIVATE_KEY;

    // Check if the refresh token exists in the database
    const token = await UserToken.findOne({ where: { token: refreshToken } });
    if (!token) {
      return { error: true, message: "Invalid refresh token" };
    }

    // Verify the token using jwt.verify
    const tokenDetails = jwt.verify(refreshToken, privateKey) as RefreshTokenDecoded;
    if (!tokenDetails) {
      return { error: true, message: "Invalid refresh token" };
    }

    return {
      tokenDetails,
      error: false,
      message: "Valid refresh token",
    };
  } catch (err) {
    console.log(err);
    return { error: true, message: err.message };
  }
};

export default verifyRefreshToken;

import httpStatus from "http-status";
import ApiError from "../utils/ApiError";
import verifyRefreshToken from "../utils/verifyRefreshToken";
import jwt from "jsonwebtoken";
import UserToken from "../model/UserToken";



export const getRefreshToken = async (refreshToken : string ) => {
    const result = await verifyRefreshToken(refreshToken);
  
    const { tokenDetails, message, error } = result;
  
    if (error) {
        throw new ApiError(httpStatus.UNAUTHORIZED,message);
    }
    if (tokenDetails) {
      const payload = { _id: tokenDetails._id, roles: tokenDetails.roles };
      const accessToken = jwt.sign(
        payload,
        process.env.ACCESS_TOKEN_PRIVATE_KEY,
        { expiresIn: "20m" }
      );
        return accessToken;
    }
  
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,"Internal Server Error");
  };
  

  const loggedOut = async (refreshToken : string) : Promise<boolean> => {
    try {
        const userToken = await UserToken.findOne({ token: refreshToken});
        if (!userToken)
          return true;
        await UserToken.findByIdAndDelete(userToken._id);
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
  }


const authService = {getRefreshToken,loggedOut}

export default authService;
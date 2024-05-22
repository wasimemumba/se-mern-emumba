import {User} from "../model/User";
import bcrypt from "bcrypt";
import ApiError from "../utils/ApiError";
import httpStatus from "http-status";


const loginUserWithEmailAndPassword = async (email: string, password: string)  => {
    const user = await User.findOne({ email: email });
        if (!user) {
            throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid email or password");
        }
        
        const verifiedPassword = await bcrypt.compare(password, user.password);
        if (!verifiedPassword) {
            throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid email or password");
        }
        return user;
}


const createNewUser = async (name: string, email: string, password: string, budgetLimit: number) => {
    try {
        const user = await User.create({ name, email, password, budgetLimit });
        user.password = undefined;
        return user;
    } catch (err){
        console.log(err)
        if (err.code === 11000) {
            throw new ApiError(httpStatus.BAD_REQUEST, "User with this email already exists");
        }
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error");
    }
}


const getUserById = async (id: string) => {
    return await User.findById(id);
}




const userServices =  {loginUserWithEmailAndPassword,createNewUser,getUserById} 

export default userServices;
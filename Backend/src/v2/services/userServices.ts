import { User } from "../model/User"; 
import bcrypt from "bcrypt"; // Importing bcrypt for password hashing
import ApiError from "../../utils/ApiError"; // Importing custom error class
import httpStatus from "http-status"; // Importing HTTP status codes

// Function to log in a user with email and password
const loginUserWithEmailAndPassword = async (email: string, password: string) => {
    // Find user by email
    const user = await User.findOne({ where: { email: email } });
    
    // If user does not exist, throw unauthorized error
    if (!user) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid email or password");
    }
    
    // Compare provided password with hashed password in the database
    const verifiedPassword = await bcrypt.compare(password, user.password);
    
    // If passwords do not match, throw unauthorized error
    if (!verifiedPassword) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid email or password");
    }
    
    // If email and password are valid, return the user
    return user;
}

// Function to create a new user
const createNewUser = async (name: string, email: string, password: string, budgetLimit: number) => {
    try {

        // Create a new user with provided data
        const user = await User.create({ name, email, password: password, budgetLimit });
        
        // Sequelize instance doesn't need password field hiding as it does not modify the instance directly
        // Return the created user without password
        return { ...user.get(), password: undefined };
    } catch (err) {
        // If the error is due to duplicate email, throw bad request error
        if (err.name === 'SequelizeUniqueConstraintError') {
            throw new ApiError(httpStatus.BAD_REQUEST, "User with this email already exists");
        }
        // For any other error, throw internal server error
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error");
    }
}

// Function to get a user by ID
const getUserById = async (id: string) => {
    // Find user by ID using Sequelize
    return await User.findByPk(id);
}

// Object containing user services functions
const userServices = { loginUserWithEmailAndPassword, createNewUser, getUserById };

// Exporting user services object
export default userServices;

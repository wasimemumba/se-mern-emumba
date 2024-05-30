import { User } from "../model/User"; // Importing User model
import bcrypt from "bcrypt"; // Importing bcrypt for password hashing
import ApiError from "../utils/ApiError"; // Importing custom error class
import httpStatus from "http-status"; // Importing HTTP status codes

// Function to log in a user with email and password
const loginUserWithEmailAndPassword = async (email: string, password: string) => {
    // Find user by email
    const user = await User.findOne({
        where: { email: email },
        select: ["id", "name", "email", "password", "budgetLimit"]
    });
    
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
        const user =  User.create({ name, email, password, budgetLimit });
        await user.save();
        // Hide password field from the returned user object
        user.password = undefined;
        
        // Return the created user
        return user;
    } catch (err) {
        console.log(err);
        // If the error is due to duplicate email, throw bad request error
        if (err.code === "23505") {
            throw new ApiError(httpStatus.BAD_REQUEST, "User with this email already exists");
        }
        // For any other error, throw internal server error
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error");
    }
}

// Function to get a user by ID
const getUserById = async (id: number) => {
    // Find user by ID
    return await User.findOne({where: {id: id}});
}

// Object containing user services functions
const userServices = { loginUserWithEmailAndPassword, createNewUser, getUserById };

// Exporting user services object
export default userServices;

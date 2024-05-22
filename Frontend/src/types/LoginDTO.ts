import { User } from "./User";

export interface LoginDTO {
    user : User;
    accessToken : string;
    refreshToken : string;
}
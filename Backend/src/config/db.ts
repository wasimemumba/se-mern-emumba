import "reflect-metadata"
import { DataSource } from "typeorm"
import { BudgetEntry } from "../model/BudgetEntry";
import { User } from "../model/User";
import { UserToken } from "../model/UserToken";
const connectDB = async () => {
    const AppDataSource = new DataSource({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "1234",
        database: "TestTypeOrm",
        entities: [BudgetEntry, User, UserToken],
        synchronize: true,
        logging: true,

    });
    try {
        await AppDataSource.initialize();
        console.log("Database connected")
    } catch (error){
        console.log(error)
        console.log("Error connecting to database")
    }

}

export default connectDB;
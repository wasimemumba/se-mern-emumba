import mongoose from 'mongoose';

const connectDB = async () => {
    const MONGO_URI = process.env.MONGO_URI; //Get MongoDB URI from environment variables
    mongoose.connect(MONGO_URI) //Connect to MongoDB
    .then(() => {
        console.info('Connected to MongoDB'); //Log a success message
    })
    .catch((error) => { //Log an error message if connection fails
        console.error('Error connecting to MongoDB:', error);
    });
}

export default connectDB;
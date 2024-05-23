import {Request, Response, NextFunction } from 'express'
import httpStatus from 'http-status';

//Middleware to handle 404 errors
const notFound = (req:Request, res: Response, next : NextFunction )=>{
    const error = new Error(`Not Found - ${req.originalUrl}`)
    res.status(404)
    next(error);
    }

//Middleware to handle all errors
const errorHandler = (err:any,req:Request, res: Response, next : NextFunction )=>{

    let {statusCode , message} = err; //Destructuring the error object to get the status code and message
    if(!err.isOperational){ //If the error is not operational set the status code to 500
        statusCode = httpStatus.INTERNAL_SERVER_ERROR;
        message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
    }

    res.locals.errorMessage = err.message; //Set the error message to the response object

    const response = { //Create a response object with the status code and message
        code: statusCode,  
        message,
        ...( process.env.NODE_ENV == 'dev' && {stack: err.stack})
    }

    console.log("Error: "+  err) //Log the error to the console

    res.status(statusCode).send(response); //Send the response object as a response
}


export {notFound,errorHandler} 
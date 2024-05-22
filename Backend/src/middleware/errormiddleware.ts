import {Request, Response, NextFunction } from 'express'
import httpStatus from 'http-status';


const notFound = (req:Request, res: Response, next : NextFunction )=>{
    const error = new Error(`Not Found - ${req.originalUrl}`)
    res.status(404)
    next(error);
    }


const errorHandler = (err:any,req:Request, res: Response, next : NextFunction )=>{

    let {statusCode , message} = err;
    if(!err.isOperational){
        statusCode = httpStatus.INTERNAL_SERVER_ERROR;
        message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
    }

    res.locals.errorMessage = err.message;

    const response = {
        code: statusCode,
        message,
        ...( process.env.NODE_ENV == 'dev' && {stack: err.stack})
    }

    console.log("Error: "+  err)

    res.status(statusCode).send(response);
}


export {notFound,errorHandler} 
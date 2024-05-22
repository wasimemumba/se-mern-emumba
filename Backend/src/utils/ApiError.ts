
// Custom Error class to handle API errors
class ApiError extends Error {
    statusCode : Number;
    isOperational : Boolean;
    constructor(statusCode :Number, message : string, isOperational = true, stack = '') {
      super(message);
      this.statusCode = statusCode;
      this.isOperational = isOperational;
      if (stack) {
        this.stack = stack;  
      } else {
        Error.captureStackTrace(this, this.constructor);
      }
    }
  }

export default ApiError;
  

// This middleware is used to validate the request body, query and params against the schema provided in the route.
const validate = (schema) => async (req, res, next) => {
    try {
      await schema.validate({ // Validate the request body, query and params against the schema
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next(); // If validation is successful call the next middleware
    } catch (err) { // If validation fails send a 400 status with the error message
        console.log(err)
      return res.status(400).json({ type: err.name, message: err.message });
    }
  };


  export default validate;
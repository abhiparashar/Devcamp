const ErrorResponse = require("../utils/errorResponse");
const errorHandler = (err, req, res, next) => {
  // console.log(err.stack.red)
  let error = {...err}
  const message = err.message
  //Mongoose bad objectID
  if(err.name==='CastError'){
    const message = `Resource not found with id ${err.value}`
    error = new ErrorResponse(message,404)
  }
  
  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message,
  });
};

module.exports = errorHandler;

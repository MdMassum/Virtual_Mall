const Errorhandler = require('../utils/errorhander')      // module for handling error

module.exports =(err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server error"

    // wrong mongodb id error i.e if wrong id is passed
    if(err.name === "CastError"){
        const message = `Resource not found, Invalid: ${err.path}`;
        err = new Errorhandler(message,400);
    }
    res.status(err.statusCode).json({
        success:false,
        message:err.message
    })
}
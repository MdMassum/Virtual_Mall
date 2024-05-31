const Errorhandler = require("../utils/errorhander");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require('jsonwebtoken')
const User = require('../models/usersModel')

exports.isAuthenticatedUser = catchAsyncErrors(async(req,res,next)=>{

    const {token} = req.cookies;
    if(!token){
        return next(new Errorhandler("Please Login to access this resources",401))
    }

    const decodedData = jwt.verify(token,process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    next();
})

exports.authorizeRoles = (...roles) =>{
    return(req,res,next) =>{
        if(!roles.includes(req.user.role)){
            return next(new Errorhandler(`Role : ${req.user.role} is not authorize to access this resourcess`),403)
        }
        next();
    }
}
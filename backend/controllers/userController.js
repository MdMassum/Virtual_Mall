const User = require('../models/usersModel')
const Errorhandler = require('../utils/errorhander')
const catchAsyncError = require('../middleware/catchAsyncErrors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const sendToken = require('../utils/jwtToken')
// creating a user --> Register

exports.registerUser = catchAsyncError(async(req,res) =>{

    const{name,email,password} = req.body;
    
    let user = await User.create({
        name,email,password,
        avatar:{
            public_id:"sample",
            url:"sampleurl"
        },
    });
    sendToken(user,201,res);   // generates and saves token in cookies
})

exports.loginUser = catchAsyncError(async(req,res,next)=>{

    const{email,password} = req.body;

    if(!email || !password){  // if entered empty email or password
        return next(new Errorhandler("Please Enter Email or Password",400))
    }
    let user = await User.findOne({email}).select("+password");  // since we have done select = false in schema;
  
    if(!user){    // if user not found with this mail
        return next(new Errorhandler("Invalid Email Or Password !!!",401));
    }

    const passwordComp = await bcrypt.compare(password,user.password);
    if(!passwordComp){     // if password does not matches
        return next(new Errorhandler("Invalid Email Or Password !!!",401))
    }
    sendToken(user,200,res);   // generates and saves token in cookies
})
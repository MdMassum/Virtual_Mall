const User = require('../models/usersModel')
const Errorhandler = require('../utils/errorhander')
const catchAsyncError = require('../middleware/catchAsyncErrors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const sendToken = require('../utils/jwtToken')
const sendMail = require('../utils/sendMail.js')
const crypto = require('crypto')

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

// user login
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

// user logout -->
exports.logout = catchAsyncError(async(req,res,next)=>{

    res.cookie("token",null,{
        expires: new Date(Date.now()),
        httpOnly: true,
    })
    res.status(200).json({
        success:true,
        message:"Logged Out Succeccfully"
    })
})

// forgot password -->
exports.forgotPassword = catchAsyncError(async(req,res,next)=>{

    const email = req.body.email;
    const user =  await User.findOne({email});

    if(!user){
        return next(new Errorhandler("User Not Found",404));
    }

    //get resetPassword token
    const resetToken = user.getResetPasswordToken();
    await user.save({validateBeforeSave:false});

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

    const message = `Your Password reset token is :\n ${resetPasswordUrl}\n\nIf you have not requested this email please ignore it !!`

    try {
        // function call
        await sendMail({email:user.email,subject:"Virtual Mall Password Recovery",message });

        res.status(200).json({
            success:true,
            message:`Email sent to ${user.email} successfully`
        })

    } catch (error) {  // if some error occurs chang database reset token to undefine
        user.resetPasswordToken = undefined;
        user.resetPasswordExpired = undefined;
        await user.save({validateBeforeSave:false});

        return(next(new Errorhandler(error.message,500)))
    }
})

// reset password -->
exports.resetPassword = catchAsyncError(async(req,res,next)=>{

    //creating token hash
    const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex")

    const user = await User.findOne({resetPasswordToken:resetPasswordToken})

    console.log(user);

    if(!user){
        return next(new Errorhandler("Reset Password Token is invalid or has Expired",400));
    }

    const {password,confirmPassword} = req.body;

    if(password !== confirmPassword){
        return next(new Errorhandler("Password does not match !!",400));
    }
    
    user.password = password;  // password changed 
    user.resetPasswordToken = undefined;
    user.resetPasswordExpired = undefined;
    await user.save();

    sendToken(user,200,res);
})

// get user details
exports.getUserDetails = catchAsyncError(async(req,res,next)=>{

    const user = await User.findById(req.user.id);
    res.status(200).json({
        success:true,
        user
    })
})

// update user password -->
exports.updatePassword = catchAsyncError(async(req,res,next)=>{

    const{oldPassword,newPassword,confirmPassword} = req.body;

    //finding the login user details
    const user = await User.findById(req.user.id).select('+password');

    //comparing password entered -->
    const passComp = await bcrypt.compare(oldPassword,user.password);
    if(!passComp){
        return next(new Errorhandler("Old Password Entered is Incorrect",400));
    }
    if(newPassword != confirmPassword){
        return next(new Errorhandler("Password Mismatch",400))
    }

    user.password = newPassword;
    await user.save();

    sendToken(user,200,res)
})

// update user profile except password -->
exports.updateProfile = catchAsyncError(async(req,res,next)=>{

    const newUser = {
        name:req.body.name,
        email:req.body.email,
    }
    await User.findByIdAndUpdate(req.user.id,newUser,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    res.status(200).json({
        success:true,
        message:"Profile Updated Successfully"
    })
})

// Admin routes below --->>

// get all users (admin) -->
exports.getAllUser = catchAsyncError(async(req,res,next)=>{
    const users = await User.find();
    const totalResult = await User.countDocuments();

    res.status(200).json({
        success:true,
        totalResult,
        users
    })
})

// get single user Details(admin) -->
exports.getSingleUser = catchAsyncError(async(req,res,next)=>{
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new Errorhandler(`User does not exists with id ${req.params.id}`,404))
    }
    res.status(200).json({
        success:true,
        user
    })
})

// update user role - Admin -->
exports.updateUserRole = catchAsyncError(async(req,res,next)=>{

    const newUser = {
        name:req.body.name,
        email:req.body.email,
        role:req.body.role
    }
    const user = await User.findById(req.params.id);
    if(!user){
        return next(new Errorhandler(`User does not exists with id ${req.params.id}`,404))
    }

    await User.findByIdAndUpdate(user.id,newUser,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    res.status(200).json({
        success:true,
        message:"Profile Updated Successfully"
    })
})

// Delete user - Admin -->
exports.deleteUser = catchAsyncError(async(req,res,next)=>{

    const user = await User.findById(req.params.id);

    if(!user){
        return next(new Errorhandler(`User does not exists with id ${req.params.id}`,404))
    }
    await User.findByIdAndDelete(user.id)
    res.status(200).json({
        success:true,
        message:"User Deleted Successfully"
    })
})
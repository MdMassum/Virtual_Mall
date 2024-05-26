const Product = require('../models/productModel')
const Errorhandler = require('../utils/errorhander')
const catchAsyncError = require('../middleware/catchAsyncErrors')

// for creating product
exports.createProduct = catchAsyncError(async(req,res) =>{
    let product = await Product.create(req.body)
    res.status(201).json({
        success:true,
        product
    });
})

// for getting all products
exports.getAllProducts = catchAsyncError(
    async(req,res) =>{
    const products = await Product.find();

    res.status(200).json({
        success:true,
        products,
    });
})

// Get product details
exports.getProductDetails=catchAsyncError(async(req,res,next)=>{
    let product = await Product.findById(req.params.id);
    
    if(!product){
        return next(new Errorhandler("Product Not Found",404));
    }
    res.status(200).json({
        success:true,
        product
    })
})

// for updating the product
exports.updateProduct = catchAsyncError(
    async(req,res) =>{
    let product = await Product.findById(req.params.id);
    
    if(!product){
        return res.status(404).json({
            success:false,
            message:"Product not found"})
    }
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    res.status(200).json({
        success:true,
        product
    })
})

// Delete the product -->
exports.deleteProduct=catchAsyncError(async(req,res)=>{

    let product = await Product.findById(req.params.id);

    if(!product){
        return res.status(500).json({
            success:false,
            message:"Product not found"})
    }
    await Product.findByIdAndDelete(req.params.id);
    return res.status(200).json({
        success:true,
        message:"Product Deleted Successfully"})
})

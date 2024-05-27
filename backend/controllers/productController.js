const Product = require('../models/productModel')
const Errorhandler = require('../utils/errorhander')
const catchAsyncError = require('../middleware/catchAsyncErrors')
const ApiFeatures = require('../utils/apiFeatures')

// for creating product
exports.createProduct = catchAsyncError(async(req,res) =>{
    let product = await Product.create(req.body)
    res.status(201).json({
        success:true,
        product
    });
})

// for getting all products
exports.getAllProducts = catchAsyncError(async(req,res) =>{

    const resultPerPage = 5;
    const productCount = await Product.countDocuments();

    const apiFeatures = new ApiFeatures(Product.find(),req.query)
    .search()     // search function
    .filter()     // filter function on category,price,rating
    .pagination(resultPerPage);    // total result to show in 1 page

    // const products = await Product.find();  // now instead of this do below line due to search feature
    const products = await apiFeatures.query;

    res.status(200).json({
        success:true,
        products,
        productCount
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
        product,
        productCount
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

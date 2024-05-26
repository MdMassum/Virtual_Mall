const Product = require('../models/productModel')

// for creating product
exports.createProduct = async(req,res) =>{
    let product = await Product.create(req.body)
    res.status(201).json({
        success:true,
        product
    });
}

// for getting all products
exports.getAllProducts = async(req,res) =>{
    const products = await Product.find();

    res.status(200).json({
        success:true,
        products,
    });
}

// for updating the product
exports.updateProduct = async(req,res) =>{
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
}

// Delete the product -->
exports.deleteProduct=async(req,res)=>{

    let product = await Product.findById(req.params.id);

    if(!product){
        return res.status(500).json({
            success:false,
            message:"Product not found"})
    }
    await Product.findByIdAndDelete(req.params.id);
    // await product.remove();
    return res.status(200).json({
        success:true,
        message:"Product Deleted Successfully"})
}

// Get product details
exports.getProductDetails=async(req,res)=>{
    let product = await Product.findById(req.params.id);
    
    if(!product){
        return res.status(404).json({
            success:false,
            message:"Product not found"})
    }
    res.status(200).json({
        success:true,
        product
    })
}

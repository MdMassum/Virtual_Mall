const Order = require('../models/orderModel')
const Product = require('../models/productModel')
const Errorhandler = require('../utils/errorhander')
const catchAsyncError = require('../middleware/catchAsyncErrors')

// creating new Order -->

exports.newOrder = catchAsyncError(async(req,res,next)=>{
    const{
        shippingInfo,
        orderItems,
        paymentInfo,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt:Date.now(),
        user:req.user._id
    })
    res.status(201).json({
        success:true,
        message:"Order Placed Successfully",
        order
    })
})

// get single order -->
exports.getSingleOrder =catchAsyncError(async(req,res,next)=>{
    const order = await Order.findById(req.params.id).populate(
        "user",
        "name email",
    )

    if(!order){
        return next(new Errorhandler(`Order not found with id ${req.params.id}`,404));
    }
    res.status(200).json({
        success:true,
        order
    })
})

// get loggedIn user orders i.e myOrders -->
exports.myOrders =catchAsyncError(async(req,res,next)=>{
    const orders = await Order.find({user:req.user._id})

    if(!orders){
        return next(new Errorhandler(`Order not found with id ${req.params.id}`,404));
    }
    res.status(200).json({
        success:true,
        orders
    })
})

// get All orders - Admin -->
exports.getAllOrders =catchAsyncError(async(req,res,next)=>{
    const orders = await Order.find()

    if(!orders){
        return next(new Errorhandler(`Order not found `,404));
    }
    let totalAmount = 0;
    orders.forEach((ord)=>{
        totalAmount += ord.totalPrice;
    })
    res.status(200).json({
        success:true,
        totalResult:orders.length,
        totalAmount,
        orders
    })
})

// update Order Status - Admin -->
exports.updateOrder =catchAsyncError(async(req,res,next)=>{
    const order = await Order.findById(req.params.id)
    
    if(!order){
        return next(new Errorhandler(`Order not found with id ${req.params.id}`,404));
    }

    if(order.orderStatus === "Delivered"){
        return next(new Errorhandler(`You have already Delivered this Product`,400));
    }

    order.orderStatus = req.body.status;
    if(req.body.status === "Delivered"){

        order.orderItems.forEach(async(ord)=>{
            await updateStock(ord.product,ord.quantity)
        })
        
        order.deliveredAt = Date.now();
    }
    await order.save({validateBeforeSave:false});

    res.status(200).json({
        success:true,
        order
    })
})

async function updateStock(id,quantity){
    const product = await Product.findById(id);
    
    product.stock -= quantity;
    await product.save({validateBeforeSave:false});

}


// get loggedIn user orders i.e myOrders -->
exports.myOrders =catchAsyncError(async(req,res,next)=>{
    const orders = await Order.find({user:req.user._id})

    if(!orders){
        return next(new Errorhandler(`Order not found with id ${req.params.id}`,404));
    }
    res.status(200).json({
        success:true,
        orders
    })
})

// delete orders - Admin -->
exports.deleteOrder =catchAsyncError(async(req,res,next)=>{
    const order = await Order.findById(req.params.id)

    if(!order){
        return next(new Errorhandler(`Order not found `,404));
    }

    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({
        success:true,
        message:"Order Deleted Succussfully"
    })
})

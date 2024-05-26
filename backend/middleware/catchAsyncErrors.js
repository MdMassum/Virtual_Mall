module.exports = theFunc =>(req,res,next)=>{   // instead of try and catch we use this

    Promise.resolve(theFunc(req,res,next)).catch(next);
}
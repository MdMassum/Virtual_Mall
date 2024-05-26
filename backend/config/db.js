const mongoose = require('mongoose')

// const mongoUrl = process.env.MONGODB_URL;
const mongoUrl = "mongodb://localhost:27017/virtualMall"
console.log(mongoUrl)

ConnectToMongo=async()=>{
    await mongoose.connect(mongoUrl,{
        // useNewUrlParser:true,
        // useUnifiedTopology:true,
        // useCreateIndex:true
    })
    .then((data)=>console.log(`Mongodb Connected Successfully on ${data.connection.host}`))
    .catch(err => console.log(err))
}
module.exports = ConnectToMongo;
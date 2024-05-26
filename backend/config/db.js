const mongoose = require('mongoose')

// for environment variable
const dotenv = require('dotenv')
dotenv.config({path:'backend/config/config.env'});

const mongoUrl = process.env.MONGODB_URL;

ConnectToMongo=async()=>{
    await mongoose.connect(mongoUrl)
    .then((data)=>console.log(`Mongodb Connected Successfully on ${data.connection.host}`))
    // .catch(err => console.log(err)) // we dont need this catch bcoz in server.js we have handled promise rejection
}
module.exports = ConnectToMongo;
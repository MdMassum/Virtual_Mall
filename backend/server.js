const app = require('./app.js')
const ConnectToMongo = require('./config/db.js')
const dotenv = require('dotenv')



// config
dotenv.config({path:'backend/config/.env'});  // for using environment variables
// const port = process.env.PORT;
const port = 4000;

// connecting to database
ConnectToMongo();

app.listen(port,()=>{
    console.log(`Backend Server is working on http://localhost:${port}`);
})
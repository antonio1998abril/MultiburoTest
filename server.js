const express=require ('express')
const app = express();
require('dotenv').config()
const cookieParser =require('cookie-parser')

//my routes
const Routes = require('./Routes/routes')

//Connect to data base
const mongoose = require('mongoose');
mongoose.set('runValidators', true);
mongoose.connect(process.env.DB, {
  useNewUrlParser : true, 
  useUnifiedTopology : true,
  useFindAndModify : false,
  useCreateIndex: true
}).then(response => console.log("MongoDB Connected Successfully.") )
.catch(err => console.log("Database connection failed.") );
mongoose.connection;
//get data from inputs of my frontend
app.use(express.json());
 
//get body entries
app.use(express.urlencoded({
    extended: true
  }));
//used to on jsonwebtoken cookie
 app.use(cookieParser()) 

app.use('/api',Routes.user)
app.use('/api',Routes.form)

app.use(function(err,req,res,next){
    res.json({error:err.message}) 
 })
 
const PORT = process.env.PORT || 5000
app.listen(PORT,()=> console.log("Server Activated Correctly"))



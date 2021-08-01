const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const FormSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    rcfe:{
        type:String,
        required:true
    },
    address: {
        type:String,
        required: true
    },
    age: {
        type:Number,
        required: true
    },
    email:{
        type:String,
        required:true
    }
},{timestamps:true})

module.exports = FormSchema
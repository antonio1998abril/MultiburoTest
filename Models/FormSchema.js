const mongoose = require ('mongoose')
const FormSchema =require ('./Schemas/Form')

module.exports = mongoose.model('form',FormSchema)
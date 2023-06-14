const mongoose  = require('mongoose')
const Schema    = mongoose.Schema

const employeeSchema = new Schema({
    name: {type: String},
    lastname: {type: String},
    email: {type: String},
    phone: {type: String},
    age: {type: Number},  
    photo: {type: Number}
}, {timestamps: true})

const Employee = mongoose.model('Employee', employeeSchema)
module.exports = Employee
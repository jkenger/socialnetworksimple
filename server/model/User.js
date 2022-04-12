const { Int32 } = require('bson')
const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: [true, 'Username already exist'],
        unique: true,
        lowercase: true,
        validate: [validator.isAlphanumeric, 'Invalid username']
    },
    password:{
        type: String,
        required: [true, 'Please enter a password'],
        minLength: [6, 'Minimum length of 6']
    }
})


const User = mongoose.model('users', userSchema)

module.exports = User

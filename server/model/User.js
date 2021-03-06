const { Int32 } = require('bson')
const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: [true, 'Please enter a username'],
        unique: true,
        lowercase: true,
        validate: [validator.isAlphanumeric, 'Invalid username']
    },
    password:{
        type: String,
        required: [true, 'Please enter a password'],
        minLength: [6, 'Minimum length of 6']
    },
    userinfo:{
        type:Object,
        activities:{
            type:{Number, default: 0}
        },
        followers:{
            type:{Number, default: 0}
        }
    }
})

// HASH PASSWORD
userSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
})

// AUTHENTICATOR

userSchema.statics.login = async function(username, password){
    const user = await this.findOne({username})
    if(user){
        const auth = await bcrypt.compare(password, user.password)
        if(auth){
            return user
        }
        throw Error('Invalid password')
    }
    throw Error('Invalid username')
}


const User = mongoose.model('users', userSchema)

module.exports = User

const jwt = require('jsonwebtoken')
const User = require('./../model/User')

const checkToken = (req, res, next())=>{
    const token = req.cookies.token
    console.log(token)
    nex
}
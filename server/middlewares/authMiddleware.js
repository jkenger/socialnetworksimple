const jwt = require('jsonwebtoken')
const User = require('./../model/User')

const checkToken = (req, res, next)=>{
    const token = req.cookies.token
    if(token){
        jwt.verify(token, 'secret', (err, decodedToken)=>{
            if(err){
                console.log(err)
                res.redirect('/login')
            }
            console.log(decodedToken)
            next()
        })
    }else{
        console.log('token not found')
        res.redirect('/login')
    }
}

const checkUser = (req, res, next)=>{
    const token = req.cookies.token
    if(token){
        jwt.verify(token, 'secret', async (err, decodedToken) =>{
            if(err){
                console.log(err.message)
                res.locals.user = null
                next()
            }else{
                console.log(decodedToken)
                let user = await User.findById(decodedToken.id)
                res.locals.user = user
                next()
            }
        })
    }else{
        res.locals.user = null
        next()
    }
    
}

module.exports = {checkToken, checkUser}
const express = require('express')
const morgan = require('morgan')
const ejs = require('ejs')
const app = express()
const route = require('./server/routes/userRoute')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
require('dotenv').config()



// MIDDLEWARES
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('client/public'))
app.use(cookieParser())

console.log(__dirname)
// Connection and Listener
mongoose.connect(process.env.DBURI)
.then((result)=>{
    try{
        app.listen(3000, ()=>{console.log('listening at port:', 3000)})
    }catch(err){
        console.log(err)
    }
})
.catch(err=>{
    console.log(err)
})

// TEMPLATE ENGINE
app.set('views', './client/views')
app.set('view engine', 'ejs') 

app.use(route)
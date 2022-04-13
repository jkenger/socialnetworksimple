const express = require('express')
const morgan = require('morgan')
const ejs = require('ejs')
const app = express()
const route = require('./server/routes/userRoute')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')



// MIDDLEWARES
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('client/public'))
app.use(cookieParser())

// Connection and Listener
mongoose.connect('mongodb+srv://user-ken:test123@cluster0.gej4o.mongodb.net/socialnetwork?retryWrites=true&w=majority')
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
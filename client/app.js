const express = require('express')
const app = express()


// MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// LISTENERS
app.listen(3000, ()=>{console.log('listening at port:', 3000)})

app.get('/', (req, res)=>{
    res.json('ASDASDSA')
})
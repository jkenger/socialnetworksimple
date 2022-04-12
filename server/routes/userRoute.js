const route = require('express').Router()
const userController = require('./../controller/userController')

route.get('/', userController.login_get) 

route.get('/login', userController.login_get)

route.get('/registration', userController.registration_get)

route.post('/login', userController.login_post)

route.post('/registration', userController.registration_post)


module.exports = route
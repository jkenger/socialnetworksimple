const route = require('express').Router()
const { redirect } = require('statuses')
const userController = require('./../controller/userController')

const {checkToken, checkUser} = require('./../middlewares/authMiddleware')

route.get('/login', userController.login_get)

route.get('/registration', userController.registration_get)

route.post('/login', userController.login_post)

route.post('/registration', userController.registration_post)

route.get('*', checkUser)
route.get('/', userController.login_get)
route.get('/home', checkToken, userController.home)
route.get('/logout', userController.logout)

module.exports = route
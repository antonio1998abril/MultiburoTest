const express = require ('express');
const UserController = require('../Controllers/user')
const FomrController = require('../Controllers/form')
const auth = require('../Middleware/auth');

const routes = {
    user: express.Router()
    .post('/register',UserController.register)
    .post('/login',UserController.login)
    .get('/logout',UserController.logout)
    .get('/refresh_token',UserController.refreshToken)
    .get('/info',auth,UserController.getUser)
    .post('/sendEmail',UserController.SendEmail),

    form: express.Router()
    .post('/postForm',FomrController.postForm)
    .get('/infoForm',auth,FomrController.getForm)


}

module.exports = routes
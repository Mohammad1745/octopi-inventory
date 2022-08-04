const express = require('express')
const route = express.Router()

const loginRequest = require('../../app/http/requests/auth/login_request')
const signupRequest = require('../../app/http/requests/auth/signup_request')
const authController = require('../../app/http/controllers/api/auth_controller')

route.post('/login', ...loginRequest.validate, authController.login)
route.post('/register', ...signupRequest.validate, authController.signup)

module.exports = route
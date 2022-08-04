const express = require('express')
const route = express.Router()

const {authApi}  = require('../../app/http/middlewares/api_authentication')
const saveProductRequest = require('../../app/http/requests/user/save_product_request')
const productController = require('../../app/http/controllers/api/user/product_controller')

//middleware
route.use(authApi)
route.get('/product', productController.index)
route.post('/product', ...saveProductRequest.validate, productController.store)

module.exports = route
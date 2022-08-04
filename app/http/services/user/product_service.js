const Service = require('../service')
const User = require('../../../../app/models/user')
const Product = require('../../../../app/models/product')

class ProductService extends Service {

    /**
     * ProductService constructor.
     */
    constructor() {
        super()
    }

    /**
     * @param {Object} request
     * @param response
     * @return {Object}
     */
    productList = async (request, response) => {
        try {
            let products = await Product.find({user_id: request.user.id})
            return this.response(products).success()
        } catch (e) {
            return this.response().error(e.message)
        }
    }

    /**
     * @param {Object} request
     * @param response
     * @return {Object}
     */
    store = async (request, response) => {
        try {
            const product = new Product(this.#_formatProductData(request.user, request.body))
            const productData = await product.save()

            return this.response(productData).success('Product Added Successfully')
        } catch (e) {
            return this.response().error(e.message)
        }
    }
    #_formatProductData = (user, data) => {
        return data ?
            {
                user_id: user.id,
                name: data.name,
                manufacturer: data.manufacturer,
                buy_price: data.buy_price,
                sell_price: data.sell_price,
            }
            : {}
    }
}

module.exports = ProductService
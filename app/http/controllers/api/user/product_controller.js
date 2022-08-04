const ProductService = require('../../../services/user/product_service')

class ProductController {
    /**
     * ProductService constructor.
     */
    constructor () {
        this.service = new ProductService
    }

    /**
     * @param {Object} request
     * @param {Object} response
     * @return {JSON}
     */
    store = async (request, response) => {
        return response.json( await this.service.store( request, response))
    }
}

module.exports = new ProductController()
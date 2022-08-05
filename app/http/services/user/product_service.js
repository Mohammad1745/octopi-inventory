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
            let searchStr = this.#_generateSearchString(request.query)
            let paginationQuery = this.#_generatePaginationQuery(request.query)
            let sortingQuery = this.#_generateSortingQuery(request.query)

            let recordsTotal = await Product.count({user_id : request.user.id})
            let recordsFiltered = await Product.count({user_id : request.user.id, ...searchStr})
            let results = await Product.find({user_id: request.user.id, ...searchStr},null,paginationQuery).sort(sortingQuery)

            let data = {
                "draw": request.query.draw,
                "recordsFiltered": recordsFiltered,
                "recordsTotal": recordsTotal,
                "data": results
            };
            return this.response(data).success()
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
    #_generateSearchString = (query) => {
        let searchStr = {}
        if(query.search.value)
        {
            let regex = new RegExp(query.search.value, "i")
            searchStr = { $or: [{'name': regex},{'manufacturer': regex }] };
        }
        return searchStr
    }
    #_generatePaginationQuery = (query) => {
        return {'skip': Number( query.start), 'limit': Number(query.length) }
    }
    #_generateSortingQuery = (query) => {
        let sortingQuery = {}
        sortingQuery[query.columns[Number( query.order[0].column)].data] = query.order[0].dir === 'desc' ?  -1 : 1
        return sortingQuery
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
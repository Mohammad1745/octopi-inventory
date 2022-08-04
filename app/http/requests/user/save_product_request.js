const Request = require('../request')

class SaveProductRequest extends Request{
    constructor() {
        super({
            name: 'required|string',
            manufacturer: 'required|string',
            buy_price: 'required|min:0',
            sell_price: 'required|min:0'
        })
    }
}

module.exports = new SaveProductRequest()
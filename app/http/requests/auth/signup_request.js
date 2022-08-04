const Request = require('../request')

class SignupRequest extends Request{
    constructor() {
        super({
            name: 'required|string',
            email: 'required|email|unique:user',
            password: 'required|string|min:8',
            confirmPassword: 'required|same:password',
        })
    }
}

module.exports = new SignupRequest()
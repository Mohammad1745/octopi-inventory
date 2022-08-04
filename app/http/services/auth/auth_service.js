const Service = require('../service')

class AuthService extends Service {

    /**
     * UserService constructor.
     */
    constructor() {
        super()
    }

    /**
     * @param {Object} request
     * @param response
     * @return {Object}
     */
    login = async (request, response) => {
        try {
            return this.response().success('hii')
        } catch (e) {
            return this.response().error(e.message)
        }
    }

    /**
     * @param {Object} request
     * @param response
     * @return {Object}
     */
    signUp = async (request, response) => {
        try {
            return this.response().success('hi')
        } catch (e) {
            return this.response().error(e.message)
        }
    }

    /**
     * @param {Object} request
     * @param response
     * @return {Object}
     */
    logout = (request, response) => {
        try {
            response.clearCookie('authToken');
            return this.response().success('User Logged Out Successfully')
        } catch (e) {
            return this.response().error(e.message)
        }
    }
}

module.exports = AuthService
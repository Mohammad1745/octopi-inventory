const AuthService = require('../../services/auth/auth_service')

class AuthController {
    /**
     * AuthService constructor.
     */
    constructor () {
        this.service = new AuthService
    }

    /**
     * @param {Object} request
     * @param {Object} response
     * @return {JSON}
     */
    login = async (request, response) => {
        return response.json( await this.service.login( request, response))
    }

    /**
     * @param {Object} request
     * @param {Object} response
     * @return {JSON}
     */
    signup = async (request, response) => {
        return response.json( await this.service.signUp( request, response))
    }

    /**
     * @param {Object} request
     * @param {Object} response
     * @return {JSON}
     */
    logout = (request, response) => {
        return response.json( this.service.logout)
    }
}

module.exports = new AuthController()
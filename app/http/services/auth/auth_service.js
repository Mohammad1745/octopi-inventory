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
            const user = new User(this.#_formatUserData(request.body))
            const userData = await user.save()

            return this.response(userData).success('hi')
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
    #_formatUserData = (data) => {
        return data ?
            {
                name: data.name,
                email: data.email,
                password: makeHash(data.email,data.password),
            }
            : {}
    }
    #_authorizeUser = (user, request, response) => {
        const {id, name, email, } = user
        const data = {id, name, email}
        const authToken = jwt.sign(data, process.env.AUTH_SECRET, {expiresIn: SESSION_TIMEOUT+'s'})
        if (request.headers['content-type'] ==="application/json") {
            data.authorization = {
                tokenType: 'Bearer',
                token: authToken
            }
        } else {
            // Setting the auth token in cookies
            response.cookie('authToken', authToken)
        }
        return data
    }
}

module.exports = AuthService
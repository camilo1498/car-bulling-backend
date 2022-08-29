const Usercontroller = require('../controllers/userController')
const jwt_helper = require('../helpers/jwt_helper')
const passport = require('passport')


module.exports = (app) => {
    app.post('/api/user/register', Usercontroller.registerUser),
        app.get('/api/user/login', Usercontroller.loginUser),
        app.get('/api/user/profile', [jwt_helper.verifyAccessToken, passport.authenticate('jwt', {session: false})], Usercontroller.getUserProfile)
}
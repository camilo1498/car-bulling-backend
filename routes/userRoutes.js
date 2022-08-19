const Usercontroller = require('../controllers/userController')
const passport = require('passport')

module.exports = (app) => {
    app.post('/api/user/register', Usercontroller.registerUser),
    app.get('/api/user/login', Usercontroller.loginUser),
    app.get('/api/user/profile', passport.authenticate('jwt', {session: false}), Usercontroller.getUserProfile)
}
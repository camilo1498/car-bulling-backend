const Usercontroller = require('../controllers/userController')

module.exports = (app) => {
    app.post('/api/user/register', Usercontroller.registerUser),
    app.get('/api/user/login', Usercontroller.loginUser)
}
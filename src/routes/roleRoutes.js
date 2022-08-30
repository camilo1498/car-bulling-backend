const RoleController = require('../controllers/roleController')
const validateRole = require('../middleware/validateRole')
const jwt_helper = require('../helpers/jwt_helper')
const passport = require('passport')

module.exports = (app) => {
    app.post('/api/role/create', [jwt_helper.verifyAccessToken, passport.authenticate('jwt', {session: false}), validateRole.validateAdmin], RoleController.createRole),
    app.put('/api/role/update', [jwt_helper.verifyAccessToken, passport.authenticate('jwt', {session: false}), validateRole.validateAdmin], RoleController.editRole),
    app.delete('/api/role/delete', [jwt_helper.verifyAccessToken, passport.authenticate('jwt', {session: false}), validateRole.validateAdmin], RoleController.deleteRole),
    app.get('/api/role/getAll', [jwt_helper.verifyAccessToken, passport.authenticate('jwt', {session: false}), validateRole.validateAdmin], RoleController.getAllroles),
    app.get('/api/role/getById', [jwt_helper.verifyAccessToken, passport.authenticate('jwt', {session: false}), validateRole.validateAdmin], RoleController.getRoleById)
}
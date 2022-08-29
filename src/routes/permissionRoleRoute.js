const RoleController = require('../controllers/permissionController')
const validateRole = require('../middleware/validateRole')
const jwt_helper = require('../helpers/jwt_helper')
const passport = require('passport')

module.exports = (app) => {
    app.post('/api/permission/create', [jwt_helper.verifyAccessToken, passport.authenticate('jwt', {session: false}), validateRole.validateAdmin], RoleController.createPermission)
    app.put('/api/permission/update', [jwt_helper.verifyAccessToken, passport.authenticate('jwt', {session: false}), validateRole.validateAdmin], RoleController.editPermission)
    app.delete('/api/permission/delete', [jwt_helper.verifyAccessToken, passport.authenticate('jwt', {session: false}), validateRole.validateAdmin], RoleController.deletePermission)
    app.get('/api/permission/getAll', [jwt_helper.verifyAccessToken, passport.authenticate('jwt', {session: false}), validateRole.validateAdmin], RoleController.getAll)
    app.get('/api/permission/getById', [jwt_helper.verifyAccessToken, passport.authenticate('jwt', {session: false}), validateRole.validateAdmin], RoleController.getPermissionById)
}
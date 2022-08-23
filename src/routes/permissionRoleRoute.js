const RoleController = require('../controllers/permissionController')
const validateRole = require('../middleware/validateRole')
const passport = require('passport')

module.exports = (app) => {
    app.post('/api/permission/create', [passport.authenticate('jwt', {session: false}), validateRole.validateAdmin], RoleController.createPermission)
    app.put('/api/permission/update', [passport.authenticate('jwt', {session: false}), validateRole.validateAdmin], RoleController.editPermission)
    app.delete('/api/permission/delete', [passport.authenticate('jwt', {session: false}), validateRole.validateAdmin], RoleController.deletePermission)
    app.get('/api/permission/getAll', [passport.authenticate('jwt', {session: false}), validateRole.validateAdmin], RoleController.getAll)
    app.get('/api/permission/getById', [passport.authenticate('jwt', {session: false}), validateRole.validateAdmin], RoleController.getPermissionById)
}
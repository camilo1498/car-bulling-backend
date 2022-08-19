const RoleController = require('../controllers/permissionController')
const validateRole = require('../middleware/validateRole')
const passport = require('passport')

module.exports = (app) => {
    app.post('/api/permission/create', [validateRole.validateAdmin, passport.authenticate('jwt', {session: false})], RoleController.createPermission)
    app.put('/api/permission/update', [validateRole.validateAdmin, passport.authenticate('jwt', {session: false})], RoleController.editPermission)
    app.delete('/api/permission/delete', [validateRole.validateAdmin, passport.authenticate('jwt', {session: false})], RoleController.deletePermission)
    app.get('/api/permission/getAll', [validateRole.validateAdmin, passport.authenticate('jwt', {session: false})], RoleController.getAll)
    app.get('/api/permission/getById', [validateRole.validateAdmin, passport.authenticate('jwt', {session: false})], RoleController.getPermissionById)
}
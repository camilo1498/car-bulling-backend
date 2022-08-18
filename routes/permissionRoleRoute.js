const RoleController = require('../controllers/permissionController')
const passport = require('passport')

module.exports = (app) => {
    app.post('/api/permission/create', passport.authenticate('jwt', {session: false}), RoleController.createPermission)
    app.put('/api/permission/update', passport.authenticate('jwt', {session: false}), RoleController.editPermission)
    app.delete('/api/permission/delete', passport.authenticate('jwt', {session: false}), RoleController.deletePermission)
    app.get('/api/permission/getAll', passport.authenticate('jwt', {session: false}), RoleController.getAll)
    app.get('/api/permission/getById', passport.authenticate('jwt', {session: false}), RoleController.getPermissionById)
}
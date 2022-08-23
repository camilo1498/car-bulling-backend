const RoleController = require('../controllers/roleController')
const validateRole = require('../middleware/validateRole')
const passport = require('passport')

module.exports = (app) => {
    app.post('/api/role/create', [passport.authenticate('jwt', {session: false}), validateRole.validateAdmin], RoleController.createRole),
    app.put('/api/role/update', [passport.authenticate('jwt', {session: false}), validateRole.validateAdmin], RoleController.editRole),
    app.delete('/api/role/delete', [passport.authenticate('jwt', {session: false}), validateRole.validateAdmin], RoleController.deleteRole),
    app.get('/api/role/getAll', [passport.authenticate('jwt', {session: false}), validateRole.validateAdmin], RoleController.getAllroles),
    app.get('/api/role/getById', [passport.authenticate('jwt', {session: false}), validateRole.validateAdmin], RoleController.getRoleById)
}
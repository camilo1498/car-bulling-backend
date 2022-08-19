const RoleController = require('../controllers/roleController')
const passport = require('passport')

module.exports = (app) => {
    app.post('/api/role/create', passport.authenticate('jwt', {session: false}), RoleController.createRole),
    app.put('/api/role/update', passport.authenticate('jwt', {session: false}), RoleController.editRole),
    app.delete('/api/role/delete', passport.authenticate('jwt', {session: false}), RoleController.deleteRole),
    app.get('/api/role/getAll', passport.authenticate('jwt', {session: false}), RoleController.getAllroles),
    app.get('/api/role/getById', passport.authenticate('jwt', {session: false}), RoleController.getRoleById)
}
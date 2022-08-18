const RoleController = require('../controllers/roleController')

module.exports = (app) => {
    app.post('/api/role/create', RoleController.createRole),
    app.put('/api/role/update', RoleController.editRole),
    app.delete('/api/role/delete', RoleController.deleteRole),
    app.get('/api/role/getAll', RoleController.getAllroles)
}
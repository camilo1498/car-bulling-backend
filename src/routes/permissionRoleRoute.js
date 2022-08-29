const RoleController = require('../controllers/permissionController')
const validateRole = require('../middleware/validateRole')
const jwt_helper = require('../helpers/jwt_helper')

module.exports = (app) => {
    app.post('/api/permission/create', [jwt_helper.verifyAccessToken, validateRole.validateAdmin], RoleController.createPermission)
    app.put('/api/permission/update', [jwt_helper.verifyAccessToken, validateRole.validateAdmin], RoleController.editPermission)
    app.delete('/api/permission/delete', [jwt_helper.verifyAccessToken, validateRole.validateAdmin], RoleController.deletePermission)
    app.get('/api/permission/getAll', [jwt_helper.verifyAccessToken, validateRole.validateAdmin], RoleController.getAll)
    app.get('/api/permission/getById', [jwt_helper.verifyAccessToken, validateRole.validateAdmin], RoleController.getPermissionById)
}
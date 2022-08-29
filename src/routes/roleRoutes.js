const RoleController = require('../controllers/roleController')
const validateRole = require('../middleware/validateRole')
const jwt_helper = require('../helpers/jwt_helper')

module.exports = (app) => {
    app.post('/api/role/create', [jwt_helper.verifyAccessToken, validateRole.validateAdmin], RoleController.createRole),
    app.put('/api/role/update', [jwt_helper.verifyAccessToken, validateRole.validateAdmin], RoleController.editRole),
    app.delete('/api/role/delete', [jwt_helper.verifyAccessToken, validateRole.validateAdmin], RoleController.deleteRole),
    app.get('/api/role/getAll', [jwt_helper.verifyAccessToken, validateRole.validateAdmin], RoleController.getAllroles),
    app.get('/api/role/getById', [jwt_helper.verifyAccessToken, validateRole.validateAdmin], RoleController.getRoleById)
}
const VehicleTypeController = require('../controllers/vehicleTypeController')
const validateRole = require('../middleware/validateRole')
const jwt_helper = require('../helpers/jwt_helper')

module.exports = (app) => {
    app.post('/api/vehicle_model/create', [jwt_helper.verifyAccessToken, validateRole.validateAdmin], VehicleTypeController.createModel)
    app.put('/api/vehicle_model/update', [jwt_helper.verifyAccessToken, validateRole.validateAdmin], VehicleTypeController.updateModel)
    app.delete('/api/vehicle_model/delete', [jwt_helper.verifyAccessToken, validateRole.validateAdmin], VehicleTypeController.deleteModel)
    app.get('/api/vehicle_model/getAll', [jwt_helper.verifyAccessToken, validateRole.validateAdmin], VehicleTypeController.getAllModel)
    app.get('/api/vehicle_model/getById', [jwt_helper.verifyAccessToken, validateRole.validateAdmin], VehicleTypeController.getModelById)
}
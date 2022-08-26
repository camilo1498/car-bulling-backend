const VehicleTypeController = require('../controllers/vehicleTypeController')
const validateRole = require('../middleware/validateRole')
const passport = require('passport')

module.exports = (app) => {
    app.post('/api/vehicle_model/create', [passport.authenticate('jwt', {session: false}), validateRole.validateAdmin], VehicleTypeController.createModel)
    app.put('/api/vehicle_model/update', [passport.authenticate('jwt', {session: false}), validateRole.validateAdmin], VehicleTypeController.updateModel)
    app.delete('/api/vehicle_model/delete', [passport.authenticate('jwt', {session: false}), validateRole.validateAdmin], VehicleTypeController.deleteModel)
    app.get('/api/vehicle_model/getAll', [passport.authenticate('jwt', {session: false}), validateRole.validateAdmin], VehicleTypeController.getAllModel)
    app.get('/api/vehicle_model/getById', [passport.authenticate('jwt', {session: false}), validateRole.validateAdmin], VehicleTypeController.getModelById)
}
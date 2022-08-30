const BrandController = require('../controllers/brandController')
const validateRole = require('../middleware/validateRole')
const jwt_helper = require('../helpers/jwt_helper')
const passport = require('passport')

module.exports = (app) => {
    app.post('/api/brand/create', [jwt_helper.verifyAccessToken, passport.authenticate('jwt', {session: false}), validateRole.validateAdmin], BrandController.createBrand)
    app.put('/api/brand/update', [jwt_helper.verifyAccessToken, passport.authenticate('jwt', {session: false}), validateRole.validateAdmin], BrandController.updateBrand)
    app.delete('/api/brand/delete', [jwt_helper.verifyAccessToken, passport.authenticate('jwt', {session: false}), validateRole.validateAdmin], BrandController.deleteBrand)
    app.get('/api/brand/getAll', [jwt_helper.verifyAccessToken, passport.authenticate('jwt', {session: false}), validateRole.validateAdmin], BrandController.getAllBrands)
    app.get('/api/brand/getById', [jwt_helper.verifyAccessToken, passport.authenticate('jwt', {session: false}), validateRole.validateAdmin], BrandController.getBrandById)
}
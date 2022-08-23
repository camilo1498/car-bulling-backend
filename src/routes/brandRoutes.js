const BrandController = require('../controllers/brandController')
const validateRole = require('../middleware/validateRole')
const passport = require('passport')

module.exports = (app) => {
    app.post('/api/brand/create', [passport.authenticate('jwt', {session: false}), validateRole.validateAdmin], BrandController.createBrand)
    app.put('/api/brand/update', [passport.authenticate('jwt', {session: false}), validateRole.validateAdmin], BrandController.updateBrand)
    app.delete('/api/brand/delete', [passport.authenticate('jwt', {session: false}), validateRole.validateAdmin], BrandController.deleteBrand)
    app.get('/api/brand/getAll', [passport.authenticate('jwt', {session: false}), validateRole.validateAdmin], BrandController.getAllBrands)
    app.get('/api/brand/getById', [passport.authenticate('jwt', {session: false}), validateRole.validateAdmin], BrandController.getBrandById)
}
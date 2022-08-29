const BrandController = require('../controllers/brandController')
const validateRole = require('../middleware/validateRole')
const jwt_helper = require('../helpers/jwt_helper')

module.exports = (app) => {
    app.post('/api/brand/create', [jwt_helper.verifyAccessToken, validateRole.validateAdmin], BrandController.createBrand)
    app.put('/api/brand/update', [jwt_helper.verifyAccessToken, validateRole.validateAdmin], BrandController.updateBrand)
    app.delete('/api/brand/delete', [jwt_helper.verifyAccessToken, validateRole.validateAdmin], BrandController.deleteBrand)
    app.get('/api/brand/getAll', [jwt_helper.verifyAccessToken, validateRole.validateAdmin], BrandController.getAllBrands)
    app.get('/api/brand/getById', [jwt_helper.verifyAccessToken, validateRole.validateAdmin], BrandController.getBrandById)
}
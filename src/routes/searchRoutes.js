const jwt_helper = require('../helpers/jwt_helper')
const SearchController = require('../controllers/searchController')

module.exports = (app) => {
    app.get('/api/search/findByBrand', jwt_helper.verifyAccessToken, SearchController.filterByBrand),
    app.get('/api/search/findByName', jwt_helper.verifyAccessToken, SearchController.filterbyName),
    app.get('/api/search/findByVehivleType', jwt_helper.verifyAccessToken, SearchController.filterByVehicleType)
}
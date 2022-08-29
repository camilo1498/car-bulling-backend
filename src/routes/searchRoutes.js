const jwt_helper = require('../helpers/jwt_helper')
const passport = require('passport')
const SearchController = require('../controllers/searchController')

module.exports = (app) => {
    app.get('/api/search/findByBrand', jwt_helper.verifyAccessToken, passport.authenticate('jwt', {session: false}), SearchController.filterByBrand),
    app.get('/api/search/findByName', jwt_helper.verifyAccessToken, passport.authenticate('jwt', {session: false}), SearchController.filterbyName),
    app.get('/api/search/findByVehivleType', jwt_helper.verifyAccessToken, passport.authenticate('jwt', {session: false}), SearchController.filterByVehicleType)
}
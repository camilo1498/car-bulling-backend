const validateRole = require('../middleware/validateRole')
const passport = require('passport')
const SearchController = require('../controllers/searchController')

module.exports = (app) => {
    app.get('/api/search/findByBrand', passport.authenticate('jwt', {session: false}), SearchController.filterByBrand),
    app.get('/api/search/findByName', passport.authenticate('jwt', {session: false}), SearchController.filterbyName),
    app.get('/api/search/findByVehivleType', passport.authenticate('jwt', {session: false}), SearchController.filterByVehicleType)
}
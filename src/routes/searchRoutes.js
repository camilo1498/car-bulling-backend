const validateRole = require('../middleware/validateRole')
const passport = require('passport')
const SearchController = require('../controllers/searchController')

module.exports = (app) => {
    app.get('/api/search/findByBrand', passport.authenticate('jwt', {session: false}), SearchController.filterByBrand)
}
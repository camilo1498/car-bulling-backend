const userroutes = require('./userRoutes')
const roleRoutes = require('./roleRoutes')
const permissionRoleRoutes = require('./permissionRoleRoute')
const brandRoutes = require('./brandRoutes')
const postRoutes = require('./postRoutes')
const searchRoutes = require('./searchRoutes')
const vehicleTypeRoutes = require('./vehicleTypeRoutes')
const tagsRoutes = require('./tagsRoutes')

/// init routes
module.exports = (app) => {
    userroutes(app)
    roleRoutes(app)
    permissionRoleRoutes(app)
    brandRoutes(app)
    postRoutes(app)
    searchRoutes(app)
    vehicleTypeRoutes(app)
    tagsRoutes(app)
}
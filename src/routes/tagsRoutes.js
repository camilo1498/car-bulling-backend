const jwt_helper = require('../helpers/jwt_helper')
const passport = require('passport')
const validateRole = require('../middleware/validateRole')
const TagController = require('../controllers/tagsController')

module.exports = (app) => {
    app.get('/api/tags/getAll', [jwt_helper.verifyAccessToken, passport.authenticate('jwt', {session: false})], TagController.getAllTags),
    app.get('/api/tags/getById', [jwt_helper.verifyAccessToken, passport.authenticate('jwt', {session: false})], TagController.getTagById),
    app.post('/api/tags/createTag', [jwt_helper.verifyAccessToken, passport.authenticate('jwt', {session: false}), validateRole.validateAdmin], TagController.createTag),
    app.put('/api/tags/updateTag', [jwt_helper.verifyAccessToken, passport.authenticate('jwt', {session: false}), validateRole.validateAdmin], TagController.updateTag),
    app.delete('/api/tags/deleteTag', [jwt_helper.verifyAccessToken, passport.authenticate('jwt', {session: false}), validateRole.validateAdmin], TagController.deleteTag)
}
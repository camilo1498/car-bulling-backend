const PostController = require('../controllers/postController')
const validateRole = require('../middleware/validateRole')
const passport = require('passport')

module.exports = (app) => {
    app.post('/api/post/create', [passport.authenticate('jwt', {session: false}), validateRole.validateAdmin], PostController.createPost),
    app.get('/api/post/getById', passport.authenticate('jwt', {session: false}), PostController.getPotByID)
}
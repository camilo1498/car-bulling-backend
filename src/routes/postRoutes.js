const PostController = require('../controllers/postController')
const validateRole = require('../middleware/validateRole')
const jwt_helper = require('../helpers/jwt_helper')
const passport = require('passport')
const { upload } = require('../middleware/uploadFile')



module.exports = (app) => {
    app.post('/api/post/create', [jwt_helper.verifyAccessToken, passport.authenticate('jwt', {session: false}), validateRole.validateAdmin, upload.array('image')], PostController.createPost),
        app.get('/api/post/getById', jwt_helper.verifyAccessToken, passport.authenticate('jwt', {session: false}),PostController.getPotByID),
        app.get('/api/post/getAll', jwt_helper.verifyAccessToken, passport.authenticate('jwt', {session: false}), PostController.getAll),
        app.delete('/api/post/delete', [jwt_helper.verifyAccessToken, passport.authenticate('jwt', {session: false}), validateRole.validateAdmin], PostController.deletePost),
        app.put('/api/post/likePost', jwt_helper.verifyAccessToken, passport.authenticate('jwt', {session: false}), PostController.likePost),
        app.put('/api/post/updatePost', [jwt_helper.verifyAccessToken, passport.authenticate('jwt', {session: false}), validateRole.validateAdmin], PostController.updatePost),
        app.put('/api/post/savePost', jwt_helper.verifyAccessToken, passport.authenticate('jwt', {session: false}), PostController.savePost)
}
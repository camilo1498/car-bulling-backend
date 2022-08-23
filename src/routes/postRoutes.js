const PostController = require('../controllers/postController')
const validateRole = require('../middleware/validateRole')
const passport = require('passport')
const { upload } = require('../middleware/uploadFile')



module.exports = (app) => {
    app.post('/api/post/create', [passport.authenticate('jwt', { session: false }), validateRole.validateAdmin, upload.array('images')], PostController.createPost),
        app.get('/api/post/getById', passport.authenticate('jwt', { session: false }), PostController.getPotByID),
        app.get('/api/post/getAll', passport.authenticate('jwt', { session: false }), PostController.getAll),
        app.delete('/api/post/delete', [passport.authenticate('jwt', { session: false }), validateRole.validateAdmin], PostController.deletePost),
        app.put('/api/post/likePost', passport.authenticate('jwt', { session: false }), PostController.likePost),
        app.put('/api/post/updatePost', [passport.authenticate('jwt', { session: false }), validateRole.validateAdmin], PostController.updatePost),
        app.put('/api/post/savePost', passport.authenticate('jwt', { session: false }), PostController.savePost)
}
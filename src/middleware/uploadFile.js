const multer = require('multer')

const storage = multer.diskStorage({
    destination: ( req, file, cb ) => {
        cb(null, 'uploads')
    },
    filename: ( req, file, cb ) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname)
    }
})

const file_filter = ( req, file, cb ) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer({storage: storage, fileFilter: file_filter})

module.exports = { upload }
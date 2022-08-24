const cloudinary = require('cloudinary')
const dotenenv = require('dotenv')

dotenenv.config()

console.log(process.env.CLOUD_API_KEY) 
/// init cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})


exports.uploads = (file, folder) => {
    return new Promise( resolve => {
        cloudinary.uploader.upload(file, (result) => {
            resolve({
                URL: result.url,
                id: result.public_id
            })
        }, {
            resource_type: "auto",
            folder: folder
        })
    })
}
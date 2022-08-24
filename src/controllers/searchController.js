const validations = require('../utils/validations')
const jwt = require('jsonwebtoken')
const PostModel = require('../models/vehicles/post_model')
const BrandModel = require('../models/vehicles/brand_model')

module.exports = {
    async filterByBrand( req, res ) {
        try {
            const { brand_id } = req.query
            console.log(brand_id)
            await PostModel.find({ brand: brand_id }).then( response => {
                res.status(200).json({
                    success: true,
                    message: 'getting by brands',
                    data: response
                })
            }).catch( err => {
                validations.validateResponse(res, err)
            })
        } catch(e) {
            validations.validateResponse(res, e ?? 'Error finding by brand')
        }
    }
}
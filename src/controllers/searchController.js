const validations = require('../utils/validations')
const jwt = require('jsonwebtoken')
const PostModel = require('../models/vehicles/post_model')
const BrandModel = require('../models/vehicles/brand_model')

module.exports = {
    async filterByBrand(req, res) {
        try {
            const { brand_id } = req.query
            await PostModel.find({ brand: brand_id }, { images: { $slice: 1 } }).select([
                '{ images:{$slice:  1}',
                "name",
                "price",
                "data_sheet.release_date",
                "data_sheet.mileage",
                "concessionarie_location",
                "is_new"
            ]).then(response => {
                res.status(200).json({
                    success: true,
                    message: 'getting by brands',
                    data: response
                })
            }).catch(err => {
                validations.validateResponse(res, err)
            })
        } catch (e) {
            validations.validateResponse(res, e ?? 'Error finding by brand')
        }
    },

    async filterbyName( req, res ) {
        try {
            const { text } = req.query
           
            await PostModel.find({ name: {'$regex': '(\s+che|^' + text + ')', '$options': 'i'}}).then( response => {
                res.status(200).json({
                    success: true,
                    message: response.length != 0 ? 'searching complete' : 'no data found',
                    data: response ?? {}
                })
            }).catch( err => {
                validations.validateResponse(res, err)
            })
        } catch(e) {
            validations.validateResponse(res, e ?? 'Error searching by name')
        }
    }
}
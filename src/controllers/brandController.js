const validations = require('../utils/validations')
const BrandModel = require('../models/vehicles/brand_model')

module.exports = {
    async createBrand( req, res ) {
        try {
            const { name } = req.body

            const brand = new BrandModel({
                name
            })

            await brand.save().then( response => {
                res.status(201).json({
                    success: true,
                    message: 'Brand was created successfuly',
                    data: response ?? {}
                })
            }).catch( err => {
                validations.validateResponse(res, err)
            })

        } catch(e) {
            validations.validateResponse(res, e ?? 'Error while create brand')
        }
    },

    async updateBrand( req, res) {
        try {
            const { id, name } = req.body
            await BrandModel.findByIdAndUpdate({ _id: id }, {
                $set: {
                    name
                }
            }, { new: true}).then( response => {
                res.status(200).json({
                    success: true,
                    message: 'Brand was created successfuly',
                    data: response ?? {}
                })
            }).catch( err => {
                validations.validateResponse(res, err)
            })
        } catch(e) {
            validations.validateResponse(res, e ?? 'Error while update brand')
        }
    },

    async deleteBrand( req, res ) {
        try {
            const { id } = req.query
            await BrandModel.findByIdAndDelete({ _id: id }).then( response => {
                res.status(200).json({
                    success: true,
                    message: 'Brand was deleted successfuly',
                    data: response ?? {}
                })
            }).catch( err => {
                validations.validateResponse(res, err)
            })
        } catch(e) {
            validations.validateResponse(res, e ?? 'Error while deleting brand')
        }
    },

    async getAllBrands( req, res ) {
        try {
            await BrandModel.find({}).then( response => {
                res.status(200).json({
                    success: true,
                    message: 'Brands was getting successfuly',
                    data: response ?? {}
                })
            }).catch( err => {
                validations.validateResponse(res, err)
            })
        } catch(e) {
            validations.validateResponse(res, e ?? 'Error while getting brands')
        }
    },

    async getBrandById( req, res ) {
        try {
            const { id } = req.query
            await BrandModel.find({ _id: id}).then( response => {
                res.status(200).json({
                    success: true,
                    message: 'Brand was getting successfuly',
                    data: response ?? {}
                })
            }).catch( err => {
                validations.validateResponse(res, err)
            })
        } catch(e) {
            validations.validateResponse(res, e ?? 'Error while getting brands')
        }
    }
}
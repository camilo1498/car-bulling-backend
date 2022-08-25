/// instances
const validations = require('../utils/validations')
const BrandModel = require('../models/vehicles/brand_model')

/// class functions
module.exports = {
    /// create brand
    async createBrand(req, res) {
        try {
            /// get and save http param into a variable
            const { name } = req.body

            /// set param data to brand model
            const brand = new BrandModel({
                name
            })

            /// DB query
            await brand.save()
                /// success response
                .then(response => {
                    res.status(201).json({
                        success: true,
                        message: 'Brand was created successfuly',
                        data: response ?? {}
                    })
                }) /// error response
                .catch(err => {
                    validations.validateResponse(res, err)
                })

        } catch (e) {
            /// internal error
            validations.validateResponse(res, e ?? 'Error while create brand')
        }
    },

    /// update brand data
    async updateBrand(req, res) {
        try {
            /// get and save http param into a variable
            const { id, name } = req.body

            /// DB query
            await BrandModel.findByIdAndUpdate({ _id: id }, {
                /// data that will be update
                $set: {
                    name
                }
            },  /// only update fields that has changes
                { new: true }).then(response => {
                    /// success response
                    res.status(200).json({
                        success: true,
                        message: 'Brand was created successfuly',
                        data: response ?? {}
                    })
                }) /// error response
                .catch(err => {
                    validations.validateResponse(res, err)
                })
        } catch (e) {
            /// inernal error
            validations.validateResponse(res, e ?? 'Error while update brand')
        }
    },

    /// delete brand
    async deleteBrand(req, res) {
        try {
            /// get and save http param into a variable
            const { id } = req.query

            /// DB query
            await BrandModel.findByIdAndDelete({ _id: id })
                /// success response
                .then(response => {
                    res.status(200).json({
                        success: true,
                        message: 'Brand was deleted successfuly',
                        data: response ?? {}
                    })
                }) /// error response
                .catch(err => {
                    validations.validateResponse(res, err)
                })
        } catch (e) {
            /// internal error
            validations.validateResponse(res, e ?? 'Error while deleting brand')
        }
    },

    /// get all collection data
    async getAllBrands(req, res) {
        try {
            /// DB query
            await BrandModel.find({})
                /// success response
                .then(response => {
                    res.status(200).json({
                        success: true,
                        message: 'Brands was getting successfuly',
                        data: response ?? {}
                    })
                }) /// error response
                .catch(err => {
                    validations.validateResponse(res, err)
                })
        } catch (e) {
            /// internal error
            validations.validateResponse(res, e ?? 'Error while getting brands')
        }
    },

    /// get brand by id
    async getBrandById(req, res) {
        try {
            /// get and save http param into a variable
            const { id } = req.query

            // DB query
            await BrandModel.find({ _id: id })
                /// success response
                .then(response => {
                    res.status(200).json({
                        success: true,
                        message: 'Brand was getting successfuly',
                        data: response ?? {}
                    })
                }) /// error response
                .catch(err => {
                    validations.validateResponse(res, err)
                })
        } catch (e) {
            /// internal error
            validations.validateResponse(res, e ?? 'Error while getting brands')
        }
    }
}
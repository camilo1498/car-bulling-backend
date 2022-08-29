/// instances
const validations = require('../utils/validations')
const jwt = require('jsonwebtoken')
const PostModel = require('../models/vehicles/post_model')
const BrandModel = require('../models/vehicles/brand_model')

/// specific data that will be show in json response
const selected_query_data = [
    'images',
    "name",
    "price",
    "data_sheet.release_date",
    "data_sheet.mileage",
    "concessionarie_location",
    "is_new"
]

/// class functions
module.exports = {
    /// search vehicle by brand id
    async filterByBrand(req, res) {
        try {
            /// get and save http param into a variable
            const { brand_id } = req.query

            /// DB query
            await PostModel.find({ brand: brand_id }, { images: { $slice: 1 } })
                .select(selected_query_data)
                /// success response
                .then(response => {
                    res.status(200).json({
                        success: true,
                        message: 'getting by brands',
                        data: response ?? {}
                    })
                }) /// error response
                .catch(err => {
                    validations.validateResponse(res, err)
                })
        } catch (e) {
            /// internal error
            validations.validateResponse(res, e ?? 'Error finding by brand')
        }
    },

    /// search vehicle by  typing letters
    async filterbyName(req, res) {
        try {
            /// get and save http param into a variable

            const { text } = req.query

            /// regrex query
            const query = { '$regex': '(\s+che|^' + text + ')', '$options': 'i' }

            /// db query
            await PostModel.find({ name: query })
                /// select specific collection data fields
                .select(selected_query_data)
                /// succes response
                .then(response => {
                    res.status(200).json({
                        success: true,
                        message: response.length != 0 ? 'searching complete' : 'no data found',
                        data: response ?? {}
                    })
                }) /// error response
                .catch(err => {
                    validations.validateResponse(res, err)
                })
        } catch (e) {
            /// internal error
            validations.validateResponse(res, e ?? 'Error searching by name')
        }
    },

    async filterByVehicleType(req, res) {
        try {

            /// get and save http param into a variable
            const { type_id } = req.query

            /// DB query
            await PostModel.find({ "data_sheet.vehicle_type": type_id })
                /// get specific data
                .select(selected_query_data)
                /// success response
                .then(response => {
                    res.status(200).json({
                        success: true,
                        message: response === null ? 'no vechicles found' : 'searching complete',
                        data: response ?? {}
                    })
                })
                /// error response
                .catch(err => {
                    validations.validateResponse(res, err ?? 'no vechicles found')
                })


        } catch (e) {
            validations.validateResponse(res, e ?? 'Error searching by model')
        }
    },

    async getMostPopular() {

    },

    async getByMostViewed() {

    },

    async getByMostSaved() {
        
    }
}
/// instances
const validations = require('../utils/validations')
const jwt = require('jsonwebtoken')
const VehicleModelTypeModel = require('../models/vehicles/vehicle_model_type_model')
const { response } = require('express')

/// class functions
module.exports = {
    async createModel(req, res) {
        try {
            const { name } = req.body
            /// set param data to "vechicle_model" model
            const vehicle_model = new VehicleModelTypeModel({
                name
            })

            /// DB query
            await vehicle_model.save()
                /// succes response
                .then(response => {
                    res.status(201).json({
                        success: true,
                        message: 'model created successfuly',
                        data: response ?? {}
                    })
                })
                /// error response
                .catch(err => {
                    validations.validateResponse(res, err)
                })

        } catch (e) {
            /// internal error
            validations.validateResponse(res, e ?? 'Error while creating vehicle model')
        }
    },

    async updateModel(req, res) {
        try {
            /// get and save http param into a variable
            const { id, name } = req.body

            await VehicleModelTypeModel.findByIdAndUpdate({ _id: id }, {
                /// data that will be update
                $set: {
                    name
                }
            },  /// only update fields that has changes
                { new: true }).then(response => {
                    /// success response
                    res.status(200).json({
                        success: true,
                        message: response === null ? 'Error, model does not exist' : 'model was updated successfuly',
                        data: response ?? {}
                    })
                }) /// error response
                .catch(err => {
                    validations.validateResponse(res, err)
                })

        } catch (e) {
            /// internal error
            validations.validateResponse(res, e ?? 'Error while updating model')
        }
    },

    async deleteModel(req, res) {
        try {
            /// get and save http param into a variable
            const { id } = req.query

            // DV query
            await VehicleModelTypeModel.findByIdAndDelete({ _id: id })
                /// success response
                .then(response => {
                    res.status(200).json({
                        success: true,
                        message: response === null ? 'model does not exist' :'model was deleted successfuly',
                        data: response ?? {}
                    })
                }) /// error response
                .catch(err => {
                    validations.validateResponse(res, err)
                })
        } catch (e) {
            /// internal error
            validations.validateResponse(res, e ?? 'Error while deleting model')
        }
    },

    async getAllModel(req, res) {
        try {
            /// DB query
            await VehicleModelTypeModel.find({})
                /// success response
                .then(response => {
                    res.status(200).json({
                        success: true,
                        message: response.length === 0 ? 'no models found' : 'getting model',
                        data: response ?? {}
                    })
                }) /// error response
                .catch(err => {
                    validations.validateResponse(res, err)
                })
        } catch (e) {
            validations.validateResponse(res, e ?? 'Error while getting all models')
        }
    },

    async getModelById(req, res) {
        try {
            /// get and save http param into a variable
            const { id } = req.query

            /// DB query
            await VehicleModelTypeModel.findById({ _id: id })
                /// success response
                .then(response => {
                    res.status(200).json({
                        success: true,
                        message: response === null ? 'No data found' : 'Getted model',
                        data: response ?? {}
                    })
                }) /// error response
                .catch(err => {
                    validations.validateResponse(res, err)
                })
        } catch (e) {
            /// internal error
            validations.validateResponse(res, e ?? 'error getting model')
        }
    }
}
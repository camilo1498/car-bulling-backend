/// instances
const validations = require('../utils/validations')
const TagModel = require('../models/vehicles/tags_model')

module.exports = {
    async createTag(req, res) {
        try {

            const { name } = req.body

            /// set param data to "vechicle_model" model
            const tag_model = new TagModel({
                name
            })

            /// DB query
            await tag_model.save()
                .then(response => {
                    res.status(201).json({
                        success: true,
                        message: 'Tag was created',
                        data: response
                    })
                }) /// error response
                .catch(err => {
                    validations.validateResponse(res, err)
                })

        } catch (err) {
            /// internal error
            validations.validateResponse(res, e ?? 'Error while create tag')
        }
    },

    async updateTag(req, res) {
        try {
            /// get and save http param into a variable
            const { id, name } = req.body

            /// DB query
            await TagModel.findByIdAndUpdate({ _id: id }, {
                $set: { /// data that will be update
                    name
                }
            },/// only update fields that has changes
                { new: true }).then(response => {  /// success response
                    res.status(200).json({
                        success: true,
                        message: 'Updated!',
                        data: response
                    })
                }).catch(err => { /// error response
                    validations.validateResponse(res, err)
                })

        } catch (err) {
            validations.validateResponse(res, err ?? 'Error white updating tag')
        }
    },

    async deleteTag(req, res) {
        try {
            /// get and save http param into a variable
            const { id } = req.query

            // DB query
            await TagModel.findByIdAndDelete({ _id: id })
                .then(response => { /// success response
                    res.status(200).json({
                        success: true,
                        message: 'deleted',
                        data: response
                    })
                }).catch(err => { /// error response
                    validations.validateResponse(res, err)
                })
        } catch (err) { /// internal error
            validations.validateResponse(res, err ?? 'Error while deleting tag')
        }
    },

    async getAllTags(req, res) {
        try {
            /// DB query
            await TagModel.find({})
                .then(response => { /// success response
                    res.status(200).json({
                        success: true,
                        message: 'getted Tags',
                        data: response
                    })
                }).catch(err => { /// error response
                    validations.validateResponse(res, err)
                })
        } catch (err) {  /// internal error
            validations.validateResponse(res, err ?? 'Error getting tags')
        }
    },

    async getTagById(req, res) {
        try {
            /// get and save http param into a variable
            const { id } = req.query

            /// DB query
            await TagModel.find({ _id: id })
                .then(response => { /// success response
                    res.status(200).json({
                        success: true,
                        message: 'Getting tag',
                        data: response
                    })
                }).catch(err => { /// error response
                    validations.validateResponse(res, err)
                })

        } catch (err) {  /// internal error
            validations.validateResponse(res, err ?? 'Error getting tags')
        }
    }
}
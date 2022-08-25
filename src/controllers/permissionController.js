/// instances
const PermissionModel = require('../models/role_models/role_permission_model')
const validations = require('../utils/validations')

/// class functions
module.exports = {
    /// create permission
    async createPermission(req, res, next) {
        try {
            /// get and save http param into a variable
            const { permissionName, permissionDescription } = req.body

            /// set param data to user permission model
            const permission = new PermissionModel({
                permissionName,
                permissionDescription
            })

            /// DB query
            await permission.save()
                /// success response
                .then(response => {
                    res.status(201).json({
                        success: true,
                        message: 'permission was created successfuly',
                        data: response ?? {}
                    })
                }) /// error response
                .catch(err => {
                    validations.validateResponse(res, err)
                })
        } catch (e) {
            /// internal error
            validations.validateResponse(res, e ?? "Error while creating permission, please contact eith support")
        }
    },

    ///edit permission data
    async editPermission(req, res) {
        try {
            /// get and save http param into a variable
            const { id, permissionName, permissionDescription } = req.body

            /// DB query
            PermissionModel.findByIdAndUpdate({ _id: id }, {
                /// data that will be update
                $set: {
                    permissionName,
                    permissionDescription,
                    updatedAt: Date.now()
                }
            }, /// only update fields that has changes
                { new: true })
                /// success response
                .then(response => {
                    res.status(201).json({
                        success: true,
                        message: 'permission was updated successfuly',
                        data: response ?? {}
                    })
                }) /// error response
                .catch(err => {
                    validations.validateResponse(res, err)
                })
        } catch (e) {
            /// internal error
            validations.validateResponse(res, e ?? "Error while edting permission, please contact eith support")
        }
    },

    /// delete permission
    async deletePermission(req, res) {
        try {
            /// get and save http param into a variable
            const { id } = req.query

            /// DB query
            await PermissionModel.findByIdAndDelete({ _id: id })
                /// success response
                .then(response => {
                    res.status(201).json({
                        success: true,
                        message: 'permission was deleted successfuly',
                        data: response ?? {}
                    })
                })
                /// error response
                .catch(err => {
                    validations.validateResponse(res, err)
                })
        } catch (e) {
            /// internal error
            validations.validateResponse(res, e ?? "Error while deleting permission, please contact eith support")
        }
    },

    /// get all collection data
    async getAll(req, res) {
        try {
            /// DB query
            await PermissionModel.find({})
                /// success response
                .then(response => {
                    res.status(201).json({
                        success: true,
                        message: 'success',
                        data: response ?? {}
                    })
                }) /// error response
                .catch(err => {
                    validations.validateResponse(res, err)
                })
        } catch (e) {
            /// internal error
            validations.validateResponse(res, e ?? "Error while getting all permissions, please contact eith support")
        }
    },

    // get user pemission by id
    async getPermissionById(req, res) {
        try {
            /// get and save http param into a variable
            const { id } = req.query

            // DB query
            await PermissionModel.findById({ _id: id })
             /// success response
            .then(response => {
                res.status(201).json({
                    success: true,
                    message: 'success',
                    data: response ?? {}
                })
            }) /// error response
            .catch(err => {
                validations.validateResponse(res, err)
            })
        } catch (e) {
             /// internal error
            validations.validateResponse(res, e ?? "Error while getting permission, please contact eith support")
        }
    }
}
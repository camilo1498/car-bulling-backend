const PermissionModel = require('../models/role_models/role_permission_model')
const validations = require('../utils/validations')

module.exports = {
    async createPermission(req, res, next) {
        try {
            const { permissionName, permissionDescription } = req.body

            const permission = new PermissionModel({
                permissionName,
                permissionDescription
            })

            await permission.save().then( response => {
                res.status(201).json({
                    success: true,
                    message: 'permission was created successfuly',
                    data: response ?? {}
                })
            }).catch( err => {
                validations.validateResponse(res, err)
            })
        } catch(e) {
            validations.validateResponse(res, "Error while creating permission, please contact eith support")
        }
    },

    async editPermission(req, res, next) {
        try {
            const { id, permissionName, permissionDescription } = req.body

            PermissionModel.findByIdAndUpdate({ _id: id }, {
                $set: {
                    permissionName,
                    permissionDescription,
                    updatedAt: Date.now()
                }
            }, { new: true }).then( response => {
                res.status(201).json({
                    success: true,
                    message: 'permission was updated successfuly',
                    data: response ?? {}
                })
            }).catch( err => {
                validations.validateResponse(res, err)
            })
        } catch(e){
            validations.validateResponse(res, "Error while edting permission, please contact eith support")
        }
    },

    async deletePermission(req, res, next) {
        try {
            const { id } = req.query

            await PermissionModel.findByIdAndDelete({ _id: id}).then( response => {
                res.status(201).json({
                    success: true,
                    message: 'permission was deleted successfuly',
                    data: response ?? {}
                })
            }).catch( err => {
                validations.validateResponse(res, err)
            })
        } catch(e) {
            validations.validateResponse(res, "Error while deleting permission, please contact eith support")
        }
    },

    async getAll(req, res, next) {
        try {
            await PermissionModel.find({}).then( response => {
                res.status(201).json({
                    success: true,
                    message: 'success',
                    data: response ?? {}
                }) 
            }).catch( err => {
                validations.validateResponse(res, err)
            })
        } catch(e) {
            validations.validateResponse(res, "Error while getting all permissions, please contact eith support")
        }
    },

    async getPermissionById(req, res, next) {
        try {
            const { id } = req.query
            await PermissionModel.findById({ _id: id }).then( response => {
                res.status(201).json({
                    success: true,
                    message: 'success',
                    data: response ?? {}
                }) 
            }).catch( err => {
                validations.validateResponse(res, err)
            })
        } catch(e) {
            validations.validateResponse(res, "Error while getting permission, please contact eith support")
        }
    }
}
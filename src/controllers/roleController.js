const UserRoleModel = require('../models/role_models/user_role_model')
const validations = require('../utils/validations')

module.exports = {
    async createRole(req, res, next) {
        try {
            const { roleName, roleDescription } = req.body

            const role = new UserRoleModel({
                roleName,
                roleDescription,
                permissions: []
            })

            await role.save().then(response => {
                res.status(201).json({
                    success: true,
                    message: 'Role was created successfuly',
                    data: response ?? {}
                })
            }).catch(err => {
                validations.validateResponse(res, err)
            })

        } catch (e) {
            validations.validateResponse(res, 'Error while creating role, please contact with support')
        }
    },

    async editRole(req, res, next) {
        try {
            const { id, roleName, roleDescription, permissions } = req.body
        
            UserRoleModel.findByIdAndUpdate({ _id: id }, {
                $set: {
                    roleName,
                    roleDescription,
                    permissions,
                    updatedAt: Date.now()
                }
            }, { new: true }).then(response => {
                res.status(202).json({
                    success: true,
                    message: 'Role was update successfuly',
                    data: response ?? {}
                })
            }).catch(err => {
                validations.validateResponse(res, err)
            })

        } catch (e) {
            validations.validateResponse(res, 'Error while updating role, please contact with support')
        }
    },

    async deleteRole(req, res, next) {
        try {
            const { id } = req.query
            UserRoleModel.findByIdAndDelete({ _id: id }).then(response => {
                res.status(202).json({
                    success: true,
                    message: 'Role was deleted successfuly',
                    data: response ?? {}
                })
            }).catch(err => {
                validations.validateResponse(res, err)
            })
        } catch (e) {
            validations.validateResponse(res, 'Error while deleting role, please contact with support')
        }
    },

    async getAllroles(req, res, next) {
        try {
            await UserRoleModel.find({}).populate('permissions',{
                permissionName: 1
            }).then(response => {
                res.status(202).json({
                    success: true,
                    message: 'Role list',
                    data: response ?? {}
                })
            }).catch(err => {
                validations.validateResponse(res, err)
            })

        } catch (e) {
            validations.validateResponse(res, 'Error while getting roles, please contact with support')
        }
    },

    async getRoleById(req, res, next) {

        const { id } = req.query
        try {
            await UserRoleModel.findById({_id: id}).populate('permissions',{
                permissionName: 1
            }).then(response => {
                res.status(202).json({
                    success: true,
                    message: 'Role list',
                    data: response ?? {}
                })
            }).catch(err => {
                validations.validateResponse(res, err)
            })

        } catch (e) {
            validations.validateResponse(res, 'Error while getting roles, please contact with support')
        }
    }
}
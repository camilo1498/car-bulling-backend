/// instances
const UserRoleModel = require('../models/role_models/user_role_model')
const validations = require('../utils/validations')

/// class functions
module.exports = {
    /// create user role function
    async createRole(req, res) {
        try {
            /// get and save http param into a variable
            const { roleName, roleDescription } = req.body

            /// set param data to user role model
            const role = new UserRoleModel({
                roleName,
                roleDescription,
                permissions: []
            })

            /// DB query
            await role.save()
                /// success response
                .then(response => {
                    res.status(201).json({
                        success: true,
                        message: 'Role was created successfuly',
                        data: response ?? {}
                    })
                }) /// error response
                .catch(err => {
                    validations.validateResponse(res, err)
                })

        } catch (e) {
            /// internal error
            validations.validateResponse(res, e ?? 'Error while creating role, please contact with support')
        }
    },

    /// edit role data
    async editRole(req, res) {
        try {
            /// get and save http param into a variable
            const { id, roleName, roleDescription, permissions } = req.body

            /// DB query
            await UserRoleModel.findByIdAndUpdate({ _id: id }, {
                /// data that will be update
                $set: {
                    roleName,
                    roleDescription,
                    permissions
                }
            }, /// only update fields that has changes
                { new: true })
                /// success response
                .then(response => {
                    res.status(202).json({
                        success: true,
                        message: 'Role was update successfuly',
                        data: response ?? {}
                    })
                }) /// error response
                .catch(err => {
                    validations.validateResponse(res, err)
                })

        } catch (e) {
            /// inernal error
            validations.validateResponse(res, e ?? 'Error while updating role, please contact with support')
        }
    },

    /// delete user role 
    async deleteRole(req, res) {
        try {
            /// get and save http param into a variable
            const { id } = req.query

            /// DB query
            UserRoleModel.findByIdAndDelete({ _id: id })
                /// success response
                .then(response => {
                    res.status(202).json({
                        success: true,
                        message: 'Role was deleted successfuly',
                        data: response ?? {}
                    })
                }) /// error response
                .catch(err => {
                    validations.validateResponse(res, err)
                })
        } catch (e) {
            /// internal error
            validations.validateResponse(res, e ?? 'Error while deleting role, please contact with support')
        }
    },

    /// get all collection data
    async getAllroles(req, res) {
        try {
            /// DB query
            await UserRoleModel.find({})
                /// join with permissions collection and only show "permissionName" field
                .populate('permissions', {
                    permissionName: 1
                })
                /// success response
                .then(response => {
                    res.status(202).json({
                        success: true,
                        message: 'Role list',
                        data: response ?? {}
                    })
                }) /// error response
                .catch(err => {
                    validations.validateResponse(res, err)
                })

        } catch (e) {
            /// internal error
            validations.validateResponse(res, e ?? 'Error while getting roles, please contact with support')
        }
    },

    /// get user role by id
    async getRoleById(req, res) {
        try {
            /// get and save http param into a variable
            const { id } = req.query

            /// DB query
            await UserRoleModel.findById({ _id: id })
                /// join with permissions collection and only show "permissionName" field
                .populate('permissions', {
                    permissionName: 1
                })
                /// success response
                .then(response => {
                    res.status(202).json({
                        success: true,
                        message: 'Role list',
                        data: response ?? {}
                    })
                }) /// error response
                .catch(err => {
                    validations.validateResponse(res, err)
                })

        } catch (e) {
            /// internal error
            validations.validateResponse(res, e ?? 'Error while getting roles, please contact with support')
        }
    }
}
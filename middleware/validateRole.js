const jwt = require('jsonwebtoken')
const UserModel = require('../models/user_models/user_model')
const RoleModel = require('../models/role_models/user_role_model')
const validations = require('../utils/validations')

module.exports = {
    async validateAdmin(req, res, next) {
        try {
            let token = req.headers.authorization.split(' ')[1];
            const decodeToken = jwt.verify(token, process.env.TOKEN_SECRET)
            
            await UserModel.findById({ _id: decodeToken.id}).populate('role',{ roleName: 1 }).then( async (response) => {
                const adminRole = await RoleModel.find({ _id: {
                    $in: response.role
                }})
                for(let i = 0; i < adminRole.length; i ++ ) {
                    
                    if(adminRole[i].roleName === 'admin'){
                        next()
                        return
                    } else {
                        return validations.validateResponse(res, 'the user has not permissions')
                    }
                }
            }).catch( err => {
                return validations.validateResponse(res, err)
            })
        } catch (e) {
            return validations.validateResponse(res, 'Error getting role info!')
        }
    }
}
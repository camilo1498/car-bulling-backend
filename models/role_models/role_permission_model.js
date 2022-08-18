const { Schema, model } = require('mongoose')
const uniqueValidator =  require('mongoose-unique-validator')

const rolePermissionSchema = new Schema({
    permissionName: String,
    permissionDescription: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt:{
        type: Date,
        default: Date.now()
    },
})

rolePermissionSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

rolePermissionSchema.plugin(uniqueValidator)

const RolePermissionModel = model('role_permission', rolePermissionSchema)

module.exports = RolePermissionModel
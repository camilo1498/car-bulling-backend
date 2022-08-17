const { Schema, model } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new Schema({
    name: String,
    lastname: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    gender: String,
    phoneNumber: String,
    address: String,
    favourites: String,
    saved: String,
    chats: String,
    role: [{
        type: Schema.Types.ObjectId,
        ref: 'user_role'
    }]
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.password
    }
})

userSchema.plugin(uniqueValidator)

const UserModel = model('users', userSchema)

module.exports = UserModel
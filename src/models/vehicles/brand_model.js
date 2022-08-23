const { Schema, model } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const brandSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true,
    versionKey: false
})

brandSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

brandSchema.plugin(uniqueValidator)

const BrandModel = model('brand', brandSchema)

module.exports = BrandModel
const { Schema, model } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const tagsModelSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true,
    versionKey: false
})

tagsModelSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

tagsModelSchema.plugin(uniqueValidator)

const TagModel = model('tags', tagsModelSchema)

module.exports = TagModel
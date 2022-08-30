const { Schema, model } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const commentSchema = new Schema({
    comment: {
        type: String,
        required: true
    },
    published_by: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    post_reference: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'post'
    }
}, {
    timestamps: true,
    versionKey: false
})

commentSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

commentSchema.plugin(uniqueValidator)

const CommentModel = model('comments', commentSchema)

module.exports = CommentModel
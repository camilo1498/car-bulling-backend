const { Schema , model} = require('mongoose')
const paginate = require('mongoose-paginate-v2')

const postSchema = new Schema({
    images: {
        type: [String],
        required: true
    },
    brand: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'brand'
    },
    mileage: {
        type: Number,
        default: 0
    },
    like_count: [{
        type: Schema.Types.ObjectId,
        ref: 'users'
    }],
    view_count: [{
        type: Schema.Types.ObjectId,
        ref: 'users'
    }],
    available_colours: {
        type: Array,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    data_sheet: {
        brand: String,
        model: String,
        release_date: String,
        color: String,
        fuel_type: String,
        total_doors: Number,
        transmition_type: String,
        engine_type: String,
        mileage: Number,
        total_seats: Number
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comments'
    }],
    price: {
        type: Number,
        required: true
    },
    concessionarie_location: {
        type: String,
        required: true
    },
    contact_info: {
        type: {
            agent_name: String,
            phone_number: String
        },
        required: true
    },
    available_vehicle: {
        type: Boolean,
        default: true
    },
    is_new: {
        type: Boolean,
        default: true
    },
    created_by: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    }
}, {
    timestamps: true,
    versionKey: false
})

postSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

postSchema.plugin(paginate)

const PostModel = model('post', postSchema)

module.exports = PostModel
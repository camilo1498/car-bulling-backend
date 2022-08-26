const { Schema, model } = require('mongoose')
const paginate = require('mongoose-paginate-v2')

const postSchema = new Schema({
    image: {
        path_folder: {
            type: String,
            required: true
        },
        images: {
            type: Array,
            required: true
        }
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
        brand: {
            type: String,
            required: true
        },
        model: {
            type: Schema.Types.ObjectId,
            ref: 'vehicle_model',
            required: true
        },
        release_date: {
            type: String,
            required: true
        },
        color: {
            type: String,
            required: true
        },
        fuel_type: {
            type: String,
            required: true
        },
        total_doors: {
            type: Number,
            required: true
        },
        transmition_type: {
            type: String,
            required: true
        },
        engine_type: {
            type: String,
            required: true
        },
        mileage: {
            type: Number,
            required: true
        },
        total_seats: {
            type: Number,
            required: true
        },
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
        agent_name: {
            type: String,
            required: true
        },
        phone_number: {
            type: String,
            required: true
        },
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
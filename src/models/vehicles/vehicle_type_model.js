const { Schema, model } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const vehicleTypeSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true,
    versionKey: false
})

vehicleTypeSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

vehicleTypeSchema.plugin(uniqueValidator)

const VehicleTypeModel = model('vehicle_model', vehicleTypeSchema)

module.exports = VehicleTypeModel
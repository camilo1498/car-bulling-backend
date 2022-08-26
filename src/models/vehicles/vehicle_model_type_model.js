const { Schema, model } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const vehicleModelTypeSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true,
    versionKey: false
})

vehicleModelTypeSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

vehicleModelTypeSchema.plugin(uniqueValidator)

const VehicleModelTypeModel = model('vehicle_model', vehicleModelTypeSchema)

module.exports = VehicleModelTypeModel
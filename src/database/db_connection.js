require('dotenv').config()
const mongoose = require('mongoose')

const { MONGO_DB_URI } = process.env

const mongoConnectionUri = MONGO_DB_URI
mongoose.connect(mongoConnectionUri).then(() => {
    console.log("DB connected")
}).catch(err => {
    console.error(err)
})

process.on('uncaughtException', error => {
    console.error(error)
    mongoose.disconnect()
  })
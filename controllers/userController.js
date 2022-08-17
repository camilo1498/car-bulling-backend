const UserModel = require('../models/user_model')
const bcrypt = require('bcrypt')
const validations = require('../utils/validations')

  module.exports = {
    async registerUser (req, res, next) {
        try {
            /// parse query body
        const { name, lastname, email, password, gender, address, phoneNumber } = req.body
    

        /// validate paramaters
        if (name === undefined || name === null || name.length === 0) {
            validations.validateResponse(res, "cannot get the parameter 'name'")
        } else if (lastname === undefined || lastname === null || lastname.length === 0) {
            validations.validateResponse(res, "cannot get the parameter 'lastname'")
        } else if (email === undefined || email === null || email.length === 0) {
            validations.validateResponse(res, "cannot get the parameter 'email'")
        }  else if (!validations.validateEmail(email)) {
            validations.validateResponse(res, "invalid email")
        }else if (password === undefined || password === null || password.length === 0) {
            validations.validateResponse(res, "cannot get the parameter 'password'")
        } else if (gender === undefined || gender === null || gender.length === 0) {
            validations.validateResponse(res, "cannot get the parameter 'gender'")
        } else if (address === undefined || address === null || address.length === 0) {
            validations.validateResponse(res, "cannot get the parameter 'address'")
        } else if (phoneNumber === undefined || phoneNumber === null || phoneNumber.length === 0) {
            validations.validateResponse(res, "cannot get the parameter 'phoneNumber'")
        }
        else {
            /// encrypt password
            const hashPassword = await bcrypt.hash(password, 10)

            /// instance model object
            const user = new UserModel({
                name,
                lastname,
                email,
                password: hashPassword,
                gender,
                phoneNumber,
                address,
                role: null
            })
            /// save in db
            await user.save().then(response => {
                res.status(201).json({
                    success: true,
                    message: "user saved successfuly",
                    data: response
                })
            }).catch(err => {
            
                res.status(400).json({
                    success: false,
                    message: err['message'],
                    data: []
                })
            })
        }
        } catch(e) {
            res.status(400).json({
                success: false,
                message: 'error while user registration',
                data: []
            })
        }
    },

    async loginUser (req, res, next) {

    }
  }
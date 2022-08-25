const UserModel = require('../models/user_models/user_model')
const UserRoleModel = require('../models/role_models/user_role_model')
const bcrypt = require('bcrypt')
const validations = require('../utils/validations')
const jwt = require('jsonwebtoken')

module.exports = {
    /// register user
    async registerUser(req, res) {
        try {
            /// get and save http param into a variable
            const { name, lastname, email, password, gender, address, phoneNumber } = req.body

            /// get default user role
            const roleName = "client"
            const role = await UserRoleModel.findOne({ roleName })

            /// validate paramaters
            if (name === undefined || name === null || name.length === 0) {
                validations.validateResponse(res, "cannot get the parameter 'name'")
            } else if (lastname === undefined || lastname === null || lastname.length === 0) {
                validations.validateResponse(res, "cannot get the parameter 'lastname'")
            } else if (email === undefined || email === null || email.length === 0) {
                validations.validateResponse(res, "cannot get the parameter 'email'")
            } else if (!validations.validateEmail(email)) {
                validations.validateResponse(res, "invalid email")
            } else if (password === undefined || password === null || password.length === 0) {
                validations.validateResponse(res, "cannot get the parameter 'password'")
            } else if (gender === undefined || gender === null || gender.length === 0) {
                validations.validateResponse(res, "cannot get the parameter 'gender'")
            } else if (address === undefined || address === null || address.length === 0) {
                validations.validateResponse(res, "cannot get the parameter 'address'")
            } else if (phoneNumber === undefined || phoneNumber === null || phoneNumber.length === 0) {
                validations.validateResponse(res, "cannot get the parameter 'phoneNumber'")
            } else {
                /// instance model object
                const user = new UserModel({
                    name,
                    lastname,
                    email,
                    password,
                    gender,
                    phoneNumber,
                    address,
                    role: role._id,
                    liked_post: [],
                    saved_post: []
                })
                /// save in db
                await user.save().then(response => { /// success response
                    res.status(201).json({
                        success: true,
                        message: "user saved successfuly",
                        data: response ?? {}
                    })
                }).catch(err => { /// error response
                    res.status(400).json({
                        success: false,
                        message: err['message'],
                        data: {}
                    })
                })
            }
        } catch (e) { /// inernal error
            validations.validateResponse(res, e ?? "error while user registration, please contact with support")
        }
    },

    /// auth user
    async loginUser(req, res) {
        try {
            const { email, password } = req.query

            /// DB query
            const user = await UserModel.findOne({ email })

            /// validate and compare password
            const correctPassword = user === null
                ? false
                : await UserModel.comparePassword(password, user.password)

            /// if user or password is incorred
            if (!(user && correctPassword)) {
                /// error response
                res.status(401).json({
                    success: false,
                    message: "incorrect email or password",
                    data: {}
                })
            } else {
                /// token data
                const tokenData = {
                    id: user._id,
                    name: user.name,
                    lastname: user.lastname,
                    email: user.lastname,
                    role: user.role
                }

                /// create token
                const generated_token = jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: '30d' })
                /// success response
                res.status(201).json({
                    success: true,
                    message: "user logged",
                    token: generated_token
                })
            }
        } catch (err) { /// inernal error
            validations.validateResponse(res, e ?? "error in user login")
        }
    },

    /// get profile
    async getUserProfile(req, res) {
        try {

            /// get token from header
            const authorization = req.headers.authorization

            /// local variables
            let token = null
            let decodeToken = null
            let userId

            /// if header has data and correct format
            if (authorization && authorization.toLowerCase().startsWith('bearer')) {
                token = authorization.split(' ')[1]
            }

            /// decode token
            decodeToken = jwt.decode(token, process.env.TOKEN_SECRET)
            /// getting user id
            userId = decodeToken.id

            /// if token or decode token are invalid
            if (!token || !decodeToken.id) {
                /// error response
                validations.validateResponse(res, "invalid token")
            } else {
                /// DB query
                const user = await UserModel.findOne({ _id: userId }).populate('role', {
                    roleName: 1
                }).populate('liked_post', { /// join with post collection (liked post)
                    images: 1,
                    name: 1,
                    price: 1,
                    "data_sheet.release_date": 1,
                    "data_sheet.mileage": 1,
                    concessionarie_location: 1,
                    is_new: 1
                }).populate('saved_post', { /// join with post collection (bookmarked post)
                    images: 1,
                    name: 1,
                    price: 1,
                    "data_sheet.release_date": 1,
                    "data_sheet.mileage": 1,
                    concessionarie_location: 1,
                    is_new: 1
                })

                /// success response
                res.status(200).json({
                    success: true,
                    message: "finded user",
                    data: user ?? {}
                })
            }

        } catch (err) {
            /// inernal error
            validations.validateResponse(res, e ?? "error while getting user profile info")
        }
    }
}
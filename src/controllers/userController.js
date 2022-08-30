const UserModel = require('../models/user_models/user_model')
const UserRoleModel = require('../models/role_models/user_role_model')
const validations = require('../utils/validations')
const jwt_helper = require('../helpers/jwt_helper')

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
        } catch (err) { /// inernal error
            validations.validateResponse(res, err ?? "error while user registration, please contact with support")
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
                    email: user.email,
                    role: user.role
                }

                /// create token
                const generated_token = await jwt_helper.signAccessToken(tokenData)
                const generated_refresh_token = await jwt_helper.signRefreshToken(tokenData)

                /// success response
                res.status(201).json({
                    success: true,
                    message: "user logged",
                    token: generated_token,
                    refresh_token: generated_refresh_token
                })
            }
        } catch (err) { /// inernal error
            validations.validateResponse(res, err ?? "error in user login")
        }
    },

    /// get profile
    async getUserProfile(req, res, next) {
        try {
            /// local variables
            let decodeToken = null
            let userId

            /// decode token
            decodeToken = jwt_helper.decodeAccessToken(req)
            /// getting user id
            userId = decodeToken.id

            /// if token or decode token are invalid
            if (!decodeToken.id) {
                /// error response
                validations.validateResponse(res, "invalid token")
            } else {
                /// DB query
                const user = await UserModel.findOne({ _id: userId }).populate('role', {
                    roleName: 1
                }).populate('liked_post', { /// join with post collection (liked post)
                    "image.images": 1,
                    name: 1,
                    price: 1,
                    "data_sheet.release_date": 1,
                    "data_sheet.mileage": 1,
                    concessionarie_location: 1,
                    is_new: 1
                }).populate('saved_post', { /// join with post collection (bookmarked post)
                    "image.images": 1,
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
            validations.validateResponse(res, err ?? "error while getting user profile info")
        }
    },

    async refreshToken(req, res) {
        try {
            const { refresh_token } = req.query

            if (!refresh_token) {
                res.status(400).json({
                    success: false,
                    message: 'BadRequest',
                    data: {}
                })
            } else {
                await jwt_helper.verifyRefreshToken(refresh_token).then(async (response) => {
                    const user = await UserModel.findById({ _id: response })
                    /// token data
                    const tokenData = {
                        id: user._id,
                        name: user.name,
                        lastname: user.lastname,
                        email: user.email,
                        role: user.role
                    }

                    /// create token
                    const generated_token = await jwt_helper.signAccessToken(tokenData)
                    const generated_refresh_token = await jwt_helper.signRefreshToken(tokenData)

                    res.status(200).json({
                        success: true,
                        message: 'new generated token',
                        data: {
                            token: generated_token,
                            refresh_token: generated_refresh_token
                        }
                    })
                })
            }
        } catch (err) {
            /// internal error
            validations.validateResponse(res, err ?? 'Error while validating token')
        }
    }
}
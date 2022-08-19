const UserModel = require('../models/user_models/user_model')
const UserRoleModel = require('../models/role_models/user_role_model')
const bcrypt = require('bcrypt')
const validations = require('../utils/validations')
const jwt = require('jsonwebtoken')

  module.exports = {
    async registerUser (req, res) {
        try {
            /// parse query body
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
                role: role._id
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
            validations.validateResponse(res, "error while user registration, please contact with support")
        }
    },

    async loginUser (req, res) {
        try{
            const email = req.query.email
        const password = req.query.password
        const user = await UserModel.findOne({email})

        const correctPassword = user === null 
        ? false
        : await UserModel.comparePassword(password, user.password)

        if(!(user && correctPassword)) {
            res.status(401).json({
                success: false,
                message: "incorrect email or password",
                data: {}
            })
        } else {
            const tokenData = {
                id: user._id,
                name: user.name,
                lastname: user.lastname,
                email: user.lastname,
                role: user.role
            }
            res.status(201).json({
                success: true,
                message: "user logged",
                token: jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: '30d' })
            })
        }
        } catch(err) {
            validations.validateResponse(res, "error in user login")
        }
    },

    async getUserProfile(req, res) {
        try {
            const authorization = req.headers.authorization
            
            let token = null
            let decodeToken = null
            let userId
            if(authorization && authorization.toLowerCase().startsWith('bearer')) {
                token = authorization.split(' ')[1]
            }
            
            decodeToken = jwt.decode(token, process.env.TOKEN_SECRET)
            userId = decodeToken.id
            
            if(!token || !decodeToken.id){
                validations.validateResponse(res, "invalid token")
            } else {
                const user = await UserModel.findOne({_id: userId}).populate('role', {
                    roleName: 1
                })
                
                res.status(200).json({
                    success: true,
                    message: "finded user",
                    data: user
                })
            }

        } catch(err) {
            validations.validateResponse(res, "error while getting user profile info")
        }
    }
  }
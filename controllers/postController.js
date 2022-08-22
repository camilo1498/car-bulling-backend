const validations = require('../utils/validations')
const jwt = require('jsonwebtoken')
const PostModel = require('../models/vehicles/post_model')

module.exports = {
    async createPost( req, res ) {
        let token = req.headers.authorization.split(' ')[1];
            const decodeToken = jwt.verify(token, process.env.TOKEN_SECRET)

        console.log(decodeToken)
        try {
            const {
                images,
                brand,
                mileage,
                available_colours,
                name,
                description,
                data_sheet,
                price,
                concessionarie_location,
                contact_info,
                available_vehicle,
                is_new
            } = req.body

            const post = new PostModel({
                images,
                brand,
                mileage,
                like_count: [],
                view_count: [],
                available_colours,
                name,
                description,
                data_sheet,
                comments: [],
                price,
                concessionarie_location,
                contact_info,
                available_vehicle,
                is_new,
                created_by: decodeToken.id
            })

            await post.save().then( response => {
                res.status(201).json({
                    success: true,
                    message: 'post created',
                    data: response ?? {}
                })
            }).catch( err => {
                validations.validateResponse(res, err)
            })

        } catch(e) {
            validations.validateResponse(res, 'Error while create post')
        }
    }
}
const validations = require('../utils/validations')
const jwt = require('jsonwebtoken')
const PostModel = require('../models/vehicles/post_model')

module.exports = {
    async createPost(req, res) {
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

            await post.save().then(response => {
                res.status(201).json({
                    success: true,
                    message: 'post created',
                    data: response ?? {}
                })
            }).catch(err => {
                validations.validateResponse(res, err)
            })

        } catch (e) {
            validations.validateResponse(res, 'Error while create post')
        }
    },

    async getPotByID(req, res) {
        try {
            let token = req.headers.authorization.split(' ')[1];
            const decodeToken = jwt.verify(token, process.env.TOKEN_SECRET)

            const { id } = req.query

            const getPost = await PostModel.findById({ _id: id })

            if (getPost) {

                if (!getPost.view_count.includes(decodeToken.id)) {

                    await PostModel.findByIdAndUpdate({ _id: id }, {
                        $push: {
                            view_count: decodeToken.id
                        }
                    }, { new: true }).then( response => {
                        res.status(200).json({
                            success: true,
                            message: 'data found',
                            data: response
                        })
                    }).catch(err => {
                        res.status(200).json({
                            success: true,
                            message: 'data found',
                            data: getPost
                        })
                    })
                }
            
            } else {
                res.status(200).json({
                    success: true,
                    message: 'No data found',
                    data: {}
                })
            }

        } catch (e) {
            validations.validateResponse(res, 'Error while getting post')
        }
    }
}
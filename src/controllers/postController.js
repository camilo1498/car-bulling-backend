const validations = require('../utils/validations')
const jwt = require('jsonwebtoken')
const PostModel = require('../models/vehicles/post_model')
const UserModel = require('../models/user_models/user_model')

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
                    }, { new: true }).then(response => {
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
                } else {
                    res.status(200).json({
                        success: true,
                        message: 'data found',
                        data: getPost
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
    },

    async getAll(req, res) {
        try {
            await PostModel.find({}).select([
                "images",
                "name",
                "price",
                "data_sheet.release_date",
                "data_sheet.mileage",
                "concessionarie_location",
                "is_new"
            ]).then(response => {
                res.status(200).json({
                    success: true,
                    message: 'getting all post',
                    data: response ?? {}
                })
            }).catch(err => {
                validations.validateResponse(res, err)
            })
        } catch (e) {
            validations.validateResponse(res, 'Error while getting posts')
        }
    },

    async deletePost(req, res) {
        try {
            const { id } = req.query
            await PostModel.findByIdAndDelete({ _id: id }).then(response => {
                res.status(200).json({
                    success: true,
                    message: 'deleted post',
                    data: response ?? {}
                })
            }).catch(err => {
                validations.validateResponse(res, err)
            })
        } catch (e) {
            validations.validateResponse(res, 'Error while deleting post')
        }
    },

    async likePost(req, res) {
        try {

            let token = req.headers.authorization.split(' ')[1];
            const decodeToken = jwt.verify(token, process.env.TOKEN_SECRET)

            const { id } = req.query

            let user_like = false
            let post_like = false

            await PostModel.findById({ _id: id }).then(async (findRes) => {
                if (findRes.like_count.includes(decodeToken.id)) {
                    await PostModel.findByIdAndUpdate({ _id: id }, {
                        $pull: {
                            like_count: decodeToken.id
                        }
                    }, { new: true }).then(response => { post_like = true }).catch(err => {
                        post_like = false
                        validations.validateResponse(res, err)
                    })
                    await UserModel.findByIdAndUpdate({ _id: decodeToken.id }, {
                        $pull: {
                            liked_post: id
                        }
                    }).then(response => { user_like = true }).catch(err => {
                        user_like = false
                        validations.validateResponse(res, err)
                    })
                    if (post_like && user_like) {
                        res.status(200).json({
                            success: true,
                            message: 'unlike post',
                            data: {
                                like: false
                            }
                        })
                    }

                } else {
                    await PostModel.findByIdAndUpdate({ _id: id }, {
                        $push: {
                            like_count: decodeToken.id
                        }
                    }, { new: true }).then(response => { post_like = true }).catch(err => {
                        post_like = false
                        validations.validateResponse(res, err, { data: { like: false } })
                    })
                    await UserModel.findByIdAndUpdate({ _id: decodeToken.id }, {
                        $push: {
                            liked_post: id
                        }
                    }).then(response => { user_like = true }).catch(err => {
                        user_like = false
                        validations.validateResponse(res, err, { data: { like: false } })
                    })
                    if (post_like && user_like) {
                        res.status(200).json({
                            success: true,
                            message: 'liked post',
                            data: {
                                like: true
                            }
                        })
                    }
                }
            }).catch(findErr => {
                validations.validateResponse(res, findErr, { data: { like: false } })
            })

        } catch (e) {
            validations.validateResponse(res, 'Error while like post', { data: { like: false } })
        }
    },

    async updatePost(req, res) {
        try {
            const {
                id,
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

            await PostModel.findByIdAndUpdate({ _id: id }, {
                $set: {
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
                }
            }, {
                new: true
            }).then(response => {
                res.status(200).json({
                    success: true,
                    message: 'post updated successfuly',
                    data: response ?? {}
                })
            }).catch(err => {
                validations.validateResponse(res, err)
            })

        } catch (e) {
            validations.validateResponse(res, 'Error while updating post')
        }
    },

    async savePost(req, res) {
        try {

            let token = req.headers.authorization.split(' ')[1];
            const decodeToken = jwt.verify(token, process.env.TOKEN_SECRET)

            const { id } = req.query

            await UserModel.findById({ _id: decodeToken.id }).then(async (response) => {
                console.log(response)
                if (response.saved_post.includes(id)) {
                    await UserModel.findByIdAndUpdate({ _id: decodeToken.id }, {
                        $pull: {
                            saved_post: id
                        }
                    }, { new: true }).then(saveRes => {
                        res.status(200).json({
                            success: true,
                            message: 'post unsaved',
                            data: {
                                saved: false
                            }
                        })
                    }).catch(err => {
                        validations.validateResponse(res, err, { data: { saved: false } })
                    })
                } else {
                    await UserModel.findByIdAndUpdate({ _id: decodeToken.id }, {
                        $push: {
                            saved_post: id
                        }
                    }, { new: true }).then(saveRes => {
                        res.status(200).json({
                            success: true,
                            message: 'post saved',
                            data: {
                                saved: true
                            }
                        })
                    }).catch(err => {
                        validations.validateResponse(res, err, { data: { saved: false } })
                    })
                }

            }).catch(err => {
                validations.validateResponse(res, err, { data: { saved: false } })
            })

        } catch (e) {
            validations.validateResponse(res, 'Error save post', { data: { saved: false } })
        }
    }


}
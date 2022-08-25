/// instances
const validations = require('../utils/validations')
const jwt = require('jsonwebtoken')
const PostModel = require('../models/vehicles/post_model')
const UserModel = require('../models/user_models/user_model')
const cloudinary = require('../middleware/cloudinary')
const fs = require('fs')

/// class functions
module.exports = {
    /// create post
    async createPost(req, res) {
        /// get token from http header
        let token = req.headers.authorization.split(' ')[1];
        /// decode token
        const decodeToken = jwt.verify(token, process.env.TOKEN_SECRET)
        /// image url array
        const imageUrl = []

        try {
            /// get and save http param into a variable
            const {
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

            /// instance of cloudinary and define image path and destination folder name
            const uploader = async (path) => await cloudinary.uploads(path, 'Post Images/' + name + '_' + new Date().toISOString() + + '')

            /// get http files
            const files = req.files

            /// iterate in files array
            for (const file of files) {
                const { path } = file
                /// upload image to cloudinary service
                const newPath = await uploader(path)
                /// save cloudinary image path
                imageUrl.push(newPath.URL)
                /// delete local image
                fs.unlinkSync(path)
            }

            /// set param data to user role model
            const post = new PostModel({
                image: {
                    path_folder: imageUrl.length === 0 ? null : 'Post Images/' + name + '_' + new Date().toISOString(),
                    images : imageUrl.length === 0 ? null : imageUrl
                },
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

            /// DB query
            await post.save()
                /// success response
                .then(response => {
                    res.status(201).json({
                        success: true,
                        message: 'post created',
                        data: response ?? {}
                    })
                }) /// error response
                .catch(err => {
                    validations.validateResponse(res, err)
                })

        } catch (e) {
            /// internal error
            validations.validateResponse(res, e ?? 'Error while create post')
        }
    },

    /// get post by id
    async getPotByID(req, res) {
        try {
            /// get token from header
            let token = req.headers.authorization.split(' ')[1];
            /// decode token
            const decodeToken = jwt.verify(token, process.env.TOKEN_SECRET)

            /// get and save http param into a variable
            const { id } = req.query

            /// DB query
            await PostModel.findById({ _id: id }).then(async (response) => {
                /// validate if user id already viewed the post
                if (!response.view_count.includes(decodeToken.id)) {
                    /// DB query to update view count
                    await PostModel.findByIdAndUpdate({ _id: id }, {
                        /// add user id to "view_count"
                        $push: {
                            view_count: decodeToken.id
                        }
                    }, /// only update fields that has changes
                        { new: true }).then(response => {
                            /// success response
                            res.status(200).json({
                                success: true,
                                message: 'data found',
                                data: response
                            })
                        }).catch(err => {
                            /// error response but returned the main response data
                            res.status(200).json({
                                success: true,
                                message: 'data found',
                                data: response
                            })
                        })
                } else {
                    /// success response
                    res.status(200).json({
                        success: true,
                        message: 'data found',
                        data: response
                    })
                }
            }) /// error response
                .catch(err => {
                    res.status(200).json({
                        success: true,
                        message: err ?? 'No data found',
                        data: {}
                    })
                })

        } catch (e) {
            /// inernal error
            validations.validateResponse(res, 'Error while getting post')
        }
    },

    /// get all post
    async getAll(req, res) {
        try {
            /// DB query
            await PostModel.find({})
                .select([ /// only show specific data fields
                    "images",
                    "name",
                    "price",
                    "data_sheet.release_date",
                    "data_sheet.mileage",
                    "concessionarie_location",
                    "is_new"
                ]).then(response => { /// success response
                    res.status(200).json({
                        success: true,
                        message: 'getting all post',
                        total_items: response.length,
                        data: response ?? {}
                    })
                }).catch(err => { /// error response
                    validations.validateResponse(res, err)
                })
        } catch (e) { /// inernal error
            validations.validateResponse(res, e ?? 'Error while getting posts')
        }
    },

    /// delete post/vehicle
    async deletePost(req, res) {
        try {
            /// get and save http param into a variable
            const { id } = req.query

            /// DB query
            await PostModel.findByIdAndDelete({ _id: id })
                .then(response => { /// success response
                    res.status(200).json({
                        success: true,
                        message: 'deleted post',
                        data: response ?? {}
                    })
                }).catch(err => { /// error response
                    validations.validateResponse(res, err)
                })
        } catch (e) { /// internal error
            validations.validateResponse(res, e ?? 'Error while deleting post')
        }
    },

    /// like or unlike post/vehicle
    async likePost(req, res) {
        try {
            /// get header token
            let token = req.headers.authorization.split(' ')[1];
            /// decode token
            const decodeToken = jwt.verify(token, process.env.TOKEN_SECRET)

            /// get and save http param into a variable
            const { id } = req.query

            /// local variables
            let user_like = false
            let post_like = false

            /// DB query to post collections
            await PostModel.findById({ _id: id }).then(async (findRes) => {
                /// validate if user id already like the post/vehicle
                if (findRes.like_count.includes(decodeToken.id)) {
                    /// DB query to post to update the field
                    await PostModel.findByIdAndUpdate({ _id: id }, {
                        /// delete user id to "like_count" array
                        $pull: {
                            like_count: decodeToken.id
                        }
                    },
                        /// only update fields that has changes
                        { new: true })
                        .then(response => { post_like = true }) /// unliked post success
                        .catch(err => { /// error response
                            post_like = false
                            validations.validateResponse(res, err)
                        })

                    /// DB query to user collections
                    await UserModel.findByIdAndUpdate({ _id: decodeToken.id }, {
                        /// delete user id to "liked_post" array
                        $pull: {
                            liked_post: id
                        }
                    },
                        /// only update fields that has changes
                        { new: true })
                        .then(response => { user_like = true })/// unliked post success
                        .catch(err => { /// error response
                            user_like = false
                            validations.validateResponse(res, err)
                        })

                    /// if post and user was updated send the success response
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
                    /// DB query to post to update the field
                    await PostModel.findByIdAndUpdate({ _id: id }, {
                        /// add user id to "like_count" array
                        $push: {
                            like_count: decodeToken.id
                        }
                    },
                        /// only update fields that has changes
                        { new: true })
                        .then(response => { post_like = true }) /// liked post success
                        .catch(err => { // error response
                            post_like = false
                            validations.validateResponse(res, err, { data: { like: false } })
                        })
                    await UserModel.findByIdAndUpdate({ _id: decodeToken.id }, {
                        /// add user id to "liked_post" array
                        $push: {
                            liked_post: id
                        }
                    },
                        /// only update fields that has changes
                        { new: true })
                        .then(response => { user_like = true }) /// unliked post success
                        .catch(err => { /// error response
                            user_like = false
                            validations.validateResponse(res, err, { data: { like: false } })
                        })

                    /// if post and user was updated send the success response
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
            }).catch(findErr => { /// error response
                validations.validateResponse(res, findErr, { data: { like: false } })
            })

        } catch (e) {
            /// inernal error
            validations.validateResponse(res, e ?? 'Error while like post', { data: { like: false } })
        }
    },

    /// update post data
    async updatePost(req, res) {
        try {
            /// get and save http param into a variable
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

            /// DB query
            await PostModel.findByIdAndUpdate({ _id: id }, {
                /// data that will be update
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
            }, { /// only update fields that has changes
                new: true
            }).then(response => { /// success response
                res.status(200).json({
                    success: true,
                    message: 'post updated successfuly',
                    data: response ?? {}
                })
            }).catch(err => {  /// error response
                validations.validateResponse(res, err)
            })

        } catch (e) {
            /// inernal error
            validations.validateResponse(res, e ?? 'Error while updating post')
        }
    },

    /// save/bookmark post (user)
    async savePost(req, res) {
        try {
            /// get header token
            let token = req.headers.authorization.split(' ')[1];
            /// decode token
            const decodeToken = jwt.verify(token, process.env.TOKEN_SECRET)
            /// get and save http param into a variable
            const { id } = req.query

            /// DB query user find
            await UserModel.findById({ _id: decodeToken.id })
                .then(async (response) => { /// success response
                    if (response.saved_post.includes(id)) {
                        /// DB query user update
                        await UserModel.findByIdAndUpdate({ _id: decodeToken.id }, {
                            /// delete bookmark
                            $pull: {
                                saved_post: id
                            }
                        }, /// only update fields that has changes
                            { new: true })
                            .then(saveRes => {  /// success response
                                res.status(200).json({
                                    success: true,
                                    message: 'post unsaved',
                                    data: {
                                        saved: false
                                    }
                                })
                            }).catch(err => {  /// error response
                                validations.validateResponse(res, err, { data: { saved: false } })
                            })
                    } else {
                        /// DB query user update
                        await UserModel.findByIdAndUpdate({ _id: decodeToken.id }, {
                            /// add bookmark
                            $push: {
                                saved_post: id
                            }
                        }, { new: true })
                            .then(saveRes => {  /// success response
                                res.status(200).json({
                                    success: true,
                                    message: 'post saved',
                                    data: {
                                        saved: true
                                    }
                                })
                            }).catch(err => { /// error response
                                validations.validateResponse(res, err, { data: { saved: false } })
                            })
                    }

                }).catch(err => { /// error response
                    validations.validateResponse(res, err, { data: { saved: false } })
                })

        } catch (e) {
            /// inernal error
            validations.validateResponse(res, e ?? 'Error save post', { data: { saved: false } })
        }
    }

}
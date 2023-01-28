"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FILTER_BY_USER = exports.DELETE_ONE_DATA = exports.UPDATE_ONE_DATA = exports.GET_ONE_DATA = exports.GET_ALL_DATA = exports.CREATE_NEW_DATA = void 0;
const model_1 = require("../model/model");
const { Op } = require("sequelize");
const uuid_1 = require("uuid");
/*
    @api: /api/post/create
    @description: post register
    @method: POST
*/
const CREATE_NEW_DATA = async (req, res, next) => {
    try {
        const id = (0, uuid_1.v4)();
        const result = await model_1.Post_Tables.create({ ...req.body, id });
        return res.json({
            message: "Success",
            data: result
        });
    }
    catch (error) {
        return res.json({
            message: "Failed",
            data: error
        });
    }
};
exports.CREATE_NEW_DATA = CREATE_NEW_DATA;
/*
    @api: /api/post/all
    @description: Get posts' list bu userID + PAGINATION
    @method: GET
*/
const GET_ALL_DATA = async (req, res, next) => {
    try {
        const author_id = req.query.author_id;
        const pages = parseInt(req.query.pages) - 1;
        const count = 2;
        const skip = parseInt(pages * count);
        if (!skip || skip == "" || skip == undefined || skip == 1) {
            const result = await model_1.Post_Tables.findAll({
                where: { author: { [Op.eq]: author_id } },
                attributes: ['title', 'author'],
                limit: count // limit
            });
            return res.json({ message: "Success", count: result.length, data: result });
        }
        else if (skip >= 2) {
            const result = await model_1.Post_Tables.findAll({
                where: { author: { [Op.eq]: author_id } },
                attributes: ['title', 'author'],
                offset: skip,
                limit: count, // limit
            });
            return res.json({ message: "Success", count: result.length, data: result });
        }
    }
    catch (error) {
        return res.json({
            message: "Failed",
            data: error
        });
    }
};
exports.GET_ALL_DATA = GET_ALL_DATA;
/*
    @api: /api/post/:id
    @description: Get single post
    @method: GET
*/
const GET_ONE_DATA = async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        return res.json({
            message: "Params Id is not defined"
        });
    }
    else {
        await model_1.Post_Tables.findOne({ where: { id: id } }).then((item) => {
            if (item != null) {
                return res.json({
                    message: "Success",
                    data: item
                });
            }
            else {
                return res.json({
                    message: "Bad"
                });
            }
        });
    }
};
exports.GET_ONE_DATA = GET_ONE_DATA;
/*
    @api: /api/post/:id
    @description: Update post
    @method: PUT
*/
const UPDATE_ONE_DATA = async (req, res, next) => {
    const { id } = req.params;
    const { title, content } = req.body;
    if (!id) {
        return res.json({
            message: "Params Id is not defined"
        });
    }
    else {
        await model_1.Post_Tables.findByPk(id).then((item) => {
            if (item != null) {
                item.update({ title: title, content: content })
                    .then(() => {
                    return res.json({
                        message: "Success"
                    });
                });
            }
            else {
                return res.json({
                    message: "Bad"
                });
            }
        });
    }
};
exports.UPDATE_ONE_DATA = UPDATE_ONE_DATA;
/*
    @api: /api/post/:id
    @description: Delete post
    @method: DELETE
*/
const DELETE_ONE_DATA = async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        return res.json({
            message: "Params Id is not defined"
        });
    }
    else {
        await model_1.Post_Tables.findByPk(id).then((item) => {
            if (item != null) {
                item.destroy();
                return res.json({
                    message: "Success"
                });
            }
            else {
                return res.json({
                    message: "Bad"
                });
            }
        });
    }
};
exports.DELETE_ONE_DATA = DELETE_ONE_DATA;
/*
    @api: /api/post/user/:id
    @description: Filter posts using single userID
    @method: GET
*/
const FILTER_BY_USER = async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        return res.json({
            message: "Params Id is not defined"
        });
    }
    else {
        await model_1.Post_Tables.findByPk(id).then((item) => {
            if (item != null) {
            }
            else {
                return res.json({
                    message: "Bad"
                });
            }
        });
    }
};
exports.FILTER_BY_USER = FILTER_BY_USER;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOGIN_USER = exports.DELETE_ONE_DATA = exports.UPDATE_ONE_DATA = exports.GET_ONE_DATA = exports.GET_ALL_DATA = exports.CREATE_NEW_DATA = void 0;
const model_1 = require("../model/model");
const uuid_1 = require("uuid");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/*
    @api: /api/user/create
    @description: User register
    @method: POST
*/
const CREATE_NEW_DATA = async (req, res, next) => {
    try {
        const bodyPassword = req.body.password;
        const salting = await bcryptjs_1.default.genSalt(10);
        const hash = await bcryptjs_1.default.hash(bodyPassword, salting);
        const result = await model_1.User_Tables.create({
            id: (0, uuid_1.v4)(),
            email: req.body.email,
            password: hash
        });
        return res.json({
            message: true,
            data: result
        });
    }
    catch (error) {
        console.log(error);
        return res.json({
            message: false,
            data: error
        });
    }
};
exports.CREATE_NEW_DATA = CREATE_NEW_DATA;
/*
    @api: /api/user/login
    @description: Login
    @method: POST
*/
const LOGIN_USER = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const EMAILS = await model_1.User_Tables.findOne({ where: { email: email } });
    const userID = EMAILS.id;
    if (!EMAILS || EMAILS == null || EMAILS == "" || EMAILS == undefined) {
        return res.json({
            success: false,
            message: "User is not defined (email)"
        });
    }
    else {
        console.log(EMAILS.password);
        const isMatch = await bcryptjs_1.default.compare(password, EMAILS.password);
        if (isMatch == false) {
            return res.json({
                success: false,
                message: "User is not defined (password)"
            });
        }
        else {
            const config = { id: userID };
            const durations = 1000 * 60 * 60 * 24;
            const privateKey = "312yugg7f346go87r2";
            const token = jsonwebtoken_1.default.sign(config, privateKey, {
                expiresIn: durations
            });
            return res.json({
                success: true,
                token: token
            });
        }
    }
};
exports.LOGIN_USER = LOGIN_USER;
/*
    @api: /api/user/all
    @description: Get users' list
    @method: GET
*/
const GET_ALL_DATA = async (req, res, next) => {
    try {
        const pages = parseInt(req.query.pages) - 1;
        const count = 2;
        const skip = parseInt(pages * count);
        if (!skip || skip == "" || skip == undefined || skip == 1) {
            const result = await model_1.User_Tables.findAll({ where: {}, limit: count });
            return res.json({ message: "Success", count: result.length, data: result });
        }
        else if (skip >= 2) {
            const result = await model_1.User_Tables.findAll({ where: {}, offset: skip, limit: count });
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
    @api: /api/user/:id
    @description: Get single user
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
        await model_1.User_Tables.findOne({ where: { id: id } }).then((item) => {
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
    @api: /api/user/:id
    @description: Update user
    @method: PUT
*/
const UPDATE_ONE_DATA = async (req, res, next) => {
    const { id } = req.params;
    const { email, password } = req.body;
    if (!id) {
        return res.json({
            message: "Params Id is not defined"
        });
    }
    else {
        await model_1.User_Tables.findByPk(id).then((item) => {
            if (item != null) {
                item.update({ email: email, password: password })
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
    @api: /api/user/:id
    @description: Delete user
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
        await model_1.User_Tables.findByPk(id).then((item) => {
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

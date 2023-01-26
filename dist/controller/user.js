"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DELETE_ONE_DATA = exports.UPDATE_ONE_DATA = exports.GET_ONE_DATA = exports.GET_ALL_DATA = exports.CREATE_NEW_DATA = void 0;
const user_1 = require("../model/user");
const uuid_1 = require("uuid");
const CREATE_NEW_DATA = async (req, res, next) => {
    try {
        const id = (0, uuid_1.v4)();
        const result = await user_1.TodoInstance.create({ ...req.body, id });
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
const GET_ALL_DATA = async (req, res, next) => {
    try {
        const result = await user_1.TodoInstance.findAll({ where: {} });
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
exports.GET_ALL_DATA = GET_ALL_DATA;
const GET_ONE_DATA = async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        return res.json({
            message: "Params Id is not defined"
        });
    }
    else {
        await user_1.TodoInstance.findOne({ where: { id: id } }).then((item) => {
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
const UPDATE_ONE_DATA = async (req, res, next) => {
    const { id } = req.params;
    const { email, password } = req.body;
    if (!id) {
        return res.json({
            message: "Params Id is not defined"
        });
    }
    else {
        await user_1.TodoInstance.findByPk(id).then((item) => {
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
const DELETE_ONE_DATA = async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        return res.json({
            message: "Params Id is not defined"
        });
    }
    else {
        await user_1.TodoInstance.findByPk(id).then((item) => {
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

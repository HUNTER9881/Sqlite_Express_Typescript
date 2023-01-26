"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const errorHandler_1 = require("../middleware/errorHandler");
const validationBody_1 = require("../middleware/validationBody");
const user_1 = require("../controller/user");
exports.router = (0, express_1.Router)();
// @description: Create new data
exports.router.post("/create", validationBody_1.validationBody.checkCreateToDo(), errorHandler_1.errorHandler.handleValidationError, user_1.CREATE_NEW_DATA);
// @description: Get all data
exports.router.get("/all", user_1.GET_ALL_DATA);
// @description: Get one data
exports.router.get("/:id", user_1.GET_ONE_DATA);
// @description: Update one data
exports.router.put("/:id", validationBody_1.validationBody.checkCreateToDo(), errorHandler_1.errorHandler.handleValidationError, user_1.UPDATE_ONE_DATA);
// @description: Delete single data
exports.router.delete("/:id", user_1.DELETE_ONE_DATA);

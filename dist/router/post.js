"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRouter = void 0;
const express_1 = require("express");
const errorHandler_1 = require("../middleware/errorHandler");
const validationBody_1 = require("../middleware/validationBody");
const post_1 = require("../controller/post");
exports.PostRouter = (0, express_1.Router)();
exports.PostRouter.post("/create", validationBody_1.validationBody.data_id(), validationBody_1.validationBody.data_element("title"), validationBody_1.validationBody.data_element("content"), post_1.CREATE_NEW_DATA);
exports.PostRouter.get("/all", post_1.GET_ALL_DATA); // with PAGINATION
exports.PostRouter.get("/user/:id", post_1.FILTER_BY_USER);
exports.PostRouter.get("/:id", post_1.GET_ONE_DATA);
exports.PostRouter.put("/:id", validationBody_1.validationBody.data_element("title"), validationBody_1.validationBody.data_element("content"), errorHandler_1.errorHandler.handleValidationError, post_1.UPDATE_ONE_DATA);
exports.PostRouter.delete("/:id", post_1.DELETE_ONE_DATA);

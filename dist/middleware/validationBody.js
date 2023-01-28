"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationBody = void 0;
const express_validator_1 = require("express-validator");
const model_1 = require("../model/model");
class Validation_Body {
    validate_email(item) {
        return [
            (0, express_validator_1.body)(item)
                .notEmpty()
                .withMessage("Email is empty")
                .isEmail()
                .withMessage("You should use @ element. This is not email address")
                .custom(async (email) => {
                await model_1.User_Tables.findOne({ where: { email: email } }).then((user) => {
                    if (user) {
                        return Promise.reject('E-mail already in use');
                    }
                });
            })
        ];
    }
    data_element(item) {
        return [
            (0, express_validator_1.body)(item)
                .notEmpty()
                .withMessage(`${item} is not defined`)
        ];
    }
    data_id() {
        return [
            (0, express_validator_1.body)("id")
                .notEmpty()
                .withMessage(`ID is not defined`)
                .optional()
                .isUUID(4)
                .withMessage("ID should be UUID v4")
        ];
    }
}
exports.validationBody = new Validation_Body();

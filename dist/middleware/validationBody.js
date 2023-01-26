"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationBody = void 0;
const express_validator_1 = require("express-validator");
class Validation_Body {
    checkCreateToDo() {
        return [
            (0, express_validator_1.body)("id")
                .optional()
                .isUUID(4)
                .withMessage("ID should be UUID v4"),
            (0, express_validator_1.body)("title")
                .notEmpty()
                .withMessage("TITLE is empty"),
            (0, express_validator_1.body)("completed")
                .optional()
                .isBoolean()
                .withMessage("COMPLETED should be boolean")
                .isIn([0, false])
                .withMessage("COMPLETED should be 0 or false")
        ];
    }
}
exports.validationBody = new Validation_Body();

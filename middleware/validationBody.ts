import { body } from "express-validator";
import { User_Tables } from "../model/model";

class Validation_Body {

    validate_email(item: string) {
        return [
            body(item)
                .notEmpty()
                .withMessage("Email is empty")
                .isEmail()
                .withMessage("You should use @ element. This is not email address")
                .custom(async (email: string) => {
                    await User_Tables.findOne({ where: { email: email } }).then((user) => {
                        if (user) {
                            return Promise.reject('E-mail already in use');
                        }
                    })
                })
        ]
    }

    data_element(item: string) {
        return [
            body(item)
                .notEmpty()
                .withMessage(`${item} is not defined`)
        ]
    }

    data_id() {
        return [
            body("id")
                .notEmpty()
                .withMessage(`ID is not defined`)
                .optional()
                .isUUID(4)
                .withMessage("ID should be UUID v4")
        ]

    }
}

export const validationBody = new Validation_Body()

import { Router } from 'express';
import { errorHandler } from '../middleware/errorHandler';
import { validationBody } from '../middleware/validationBody';
import {
    CREATE_NEW_DATA,
    GET_ALL_DATA,
    DELETE_ONE_DATA,
    UPDATE_ONE_DATA,
    GET_ONE_DATA,
    LOGIN_USER
} from '../controller/user'
export const UserRouter = Router();

UserRouter.post(
    "/create",
    validationBody.data_id(),
    validationBody.validate_email("email"),
    validationBody.data_element("email"),
    validationBody.data_element("password"),
    errorHandler.handleValidationError,
    CREATE_NEW_DATA
)
UserRouter.post(
    "/login",
    validationBody.data_id(),
    validationBody.data_element("email"),
    validationBody.data_element("password"),
    errorHandler.handleValidationError,
    LOGIN_USER
)
UserRouter.get("/all", GET_ALL_DATA)
UserRouter.get("/:id", GET_ONE_DATA)
UserRouter.put(
    "/:id",
    validationBody.data_element("email"),
    validationBody.data_element("password"),
    errorHandler.handleValidationError,
    UPDATE_ONE_DATA
)
UserRouter.delete("/:id", DELETE_ONE_DATA)


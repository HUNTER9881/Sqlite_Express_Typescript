import { Router } from 'express';
import { errorHandler } from '../middleware/errorHandler';
import { validationBody } from '../middleware/validationBody';
import {
    CREATE_NEW_DATA,
    GET_ALL_DATA,
    DELETE_ONE_DATA,
    UPDATE_ONE_DATA,
    GET_ONE_DATA,
    FILTER_BY_USER
} from '../controller/post'
export const PostRouter = Router();

PostRouter.post(
    "/create",
    validationBody.data_id(),
    validationBody.data_element("title"),
    validationBody.data_element("content"),
    CREATE_NEW_DATA
)
PostRouter.get("/all", GET_ALL_DATA) // with PAGINATION
PostRouter.get("/user/:id", FILTER_BY_USER)
PostRouter.get("/:id", GET_ONE_DATA)
PostRouter.put(
    "/:id",
    validationBody.data_element("title"),
    validationBody.data_element("content"),
    errorHandler.handleValidationError,
    UPDATE_ONE_DATA
)
PostRouter.delete("/:id", DELETE_ONE_DATA)


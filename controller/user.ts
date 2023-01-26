import { Request, Response, NextFunction } from "express";
import { User_Tables } from "../model/model"
import { v4 as uuidtv4 } from 'uuid'


/*
    @api: /api/user/create
    @description: User register
    @method: POST
*/
const CREATE_NEW_DATA = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = uuidtv4()
        const result = await User_Tables.create({ ...req.body, id })
        return res.json({
            message: "Success",
            data: result
        })
    }
    catch (error) {
        return res.json({
            message: "Failed",
            data: error
        })
    }
}

/*
    @api: /api/user/all
    @description: Get users' list
    @method: GET
*/
const GET_ALL_DATA = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await User_Tables.findAll({ where: {} })
        return res.json({
            message: "Success",
            data: result
        })
    }
    catch (error) {
        return res.json({
            message: "Failed",
            data: error
        })
    }
}

/*
    @api: /api/user/:id
    @description: Get single user
    @method: GET
*/
const GET_ONE_DATA = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (!id) {
        return res.json({
            message: "Params Id is not defined"
        })
    }
    else {
        await User_Tables.findOne({ where: { id: id } }).then((item) => {
            if (item != null) {
                return res.json({
                    message: "Success",
                    data: item
                })
            }
            else {
                return res.json({
                    message: "Bad"
                })
            }
        })
    }
}

/*
    @api: /api/user/:id
    @description: Update user
    @method: PUT
*/
const UPDATE_ONE_DATA = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { email, password } = req.body;
    if (!id) {
        return res.json({
            message: "Params Id is not defined"
        })
    }
    else {
        await User_Tables.findByPk(id).then((item) => {
            if (item != null) {
                item.update({ email: email, password: password })
                    .then(() => {
                        return res.json({
                            message: "Success"
                        })
                    })
            }
            else {
                return res.json({
                    message: "Bad"
                })
            }
        })
    }
}

/*
    @api: /api/user/:id
    @description: Delete user
    @method: DELETE
*/
const DELETE_ONE_DATA = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (!id) {
        return res.json({
            message: "Params Id is not defined"
        })
    } else {
        await User_Tables.findByPk(id).then((item) => {
            if (item != null) {
                item.destroy();
                return res.json({
                    message: "Success"
                })
            } else {
                return res.json({
                    message: "Bad"
                })
            }
        })
    }
}


export { CREATE_NEW_DATA, GET_ALL_DATA, GET_ONE_DATA, UPDATE_ONE_DATA, DELETE_ONE_DATA }
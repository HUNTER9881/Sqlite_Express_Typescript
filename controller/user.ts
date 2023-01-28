import { Request, Response, NextFunction } from "express";
import { User_Tables } from "../model/model"
import { v4 as uuidtv4 } from 'uuid'
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken';

/*
    @api: /api/user/create
    @description: User register
    @method: POST
*/
const CREATE_NEW_DATA = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const bodyPassword: any = req.body.password
        const salting: any = await bcryptjs.genSalt(10)
        const hash: string | object = await bcryptjs.hash(bodyPassword, salting)

        const result: string | object = await User_Tables.create({
            id: uuidtv4(),
            email: req.body.email,
            password: hash
        })
        return res.json({
            message: true,
            data: result
        })
    }
    catch (error) {

        console.log(error)
        return res.json({
            message: false,
            data: error
        })
    }
}


/*
    @api: /api/user/login
    @description: Login
    @method: POST
*/
const LOGIN_USER = async (req: Request, res: Response, next: NextFunction) => {
    const email: string = req.body.email
    const password: string = req.body.password


    const EMAILS: any = await User_Tables.findOne({ where: { email: email } })
    const userID: string = EMAILS.id
    if (!EMAILS || EMAILS == null || EMAILS == "" || EMAILS == undefined) {
        return res.json({
            success: false,
            message: "User is not defined (email)"
        })
    }
    else {
        console.log(EMAILS.password)
        const isMatch = await bcryptjs.compare(password, EMAILS.password as string)
        if (isMatch == false) {
            return res.json({
                success: false,
                message: "User is not defined (password)"
            })
        }
        else {
            const config: object = { id: userID }
            const durations: any = 1000 * 60 * 60 * 24;
            const privateKey: string = "312yugg7f346go87r2"

            const token: any = jwt.sign(config, privateKey, {
                expiresIn: durations
            });
            return res.json({
                success: true,
                token: token
            })
        }

    }
}



/*
    @api: /api/user/all
    @description: Get users' list
    @method: GET
*/
const GET_ALL_DATA = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const pages: any = parseInt(req.query.pages as any) - 1
        const count: number = 2
        const skip: any = parseInt(pages as any * count as any)

        if (!skip || skip == "" || skip == undefined || skip == 1) {
            const result = await User_Tables.findAll({ where: {},  limit: count });
            return res.json({ message: "Success", count: result.length, data: result })
        }
        else if (skip >= 2) {
            const result = await User_Tables.findAll({ where: {}, offset: skip, limit: count });
            return res.json({ message: "Success", count: result.length, data: result })
        }
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


export { CREATE_NEW_DATA, GET_ALL_DATA, GET_ONE_DATA, UPDATE_ONE_DATA, DELETE_ONE_DATA, LOGIN_USER }
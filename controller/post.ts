import { Request, Response, NextFunction } from "express";
import { Post_Tables } from "../model/model";
const { Op } = require("sequelize");
import { v4 as uuidtv4 } from 'uuid'


/*
    @api: /api/post/create
    @description: post register
    @method: POST
*/
const CREATE_NEW_DATA = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = uuidtv4()
        const result = await Post_Tables.create({ ...req.body, id })
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
    @api: /api/post/all
    @description: Get posts' list bu userID + PAGINATION
    @method: GET
*/
const GET_ALL_DATA = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const author_id: any = req.query.author_id
        const pages: any = parseInt(req.query.pages as any) - 1
        const count: number = 2
        const skip: any = parseInt(pages as any * count as any)

        if (!skip || skip == "" || skip == undefined || skip == 1) {
            const result = await Post_Tables.findAll({
                where: { author: { [Op.eq]: author_id } },
                attributes: ['title', 'author'], // select
                limit: count   // limit
            })
            return res.json({ message: "Success", count: result.length, data: result })
        }
        else if (skip >= 2) {
            const result = await Post_Tables.findAll({
                where: { author: { [Op.eq]: author_id } },
                attributes: ['title', 'author'], // select
                offset: skip, // skip
                limit: count,   // limit
            })
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
    @api: /api/post/:id
    @description: Get single post
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
        await Post_Tables.findOne({ where: { id: id } }).then((item) => {
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
    @api: /api/post/:id
    @description: Update post
    @method: PUT
*/
const UPDATE_ONE_DATA = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { title, content } = req.body;
    if (!id) {
        return res.json({
            message: "Params Id is not defined"
        })
    }
    else {
        await Post_Tables.findByPk(id).then((item) => {
            if (item != null) {
                item.update({ title: title, content: content })
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
    @api: /api/post/:id
    @description: Delete post
    @method: DELETE
*/
const DELETE_ONE_DATA = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (!id) {
        return res.json({
            message: "Params Id is not defined"
        })
    } else {
        await Post_Tables.findByPk(id).then((item) => {
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



/*
    @api: /api/post/user/:id
    @description: Filter posts using single userID
    @method: GET
*/
const FILTER_BY_USER = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (!id) {
        return res.json({
            message: "Params Id is not defined"
        })
    } else {
        await Post_Tables.findByPk(id).then((item) => {
            if (item != null) {

            } else {
                return res.json({
                    message: "Bad"
                })
            }
        })
    }
}





export {
    CREATE_NEW_DATA,
    GET_ALL_DATA,
    GET_ONE_DATA,
    UPDATE_ONE_DATA,
    DELETE_ONE_DATA,
    FILTER_BY_USER
}
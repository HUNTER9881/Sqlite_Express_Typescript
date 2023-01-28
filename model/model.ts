import { DataTypes, Model } from "sequelize";
import database from "../config/database.sqlite";
import { pre } from '@typegoose/typegoose';
import bcrypt from 'bcryptjs';


interface UserTablesSchema {
    id: string,
    email: string,
    password: string,
}
interface PostTablesSchema {
    id: string,
    title: string,
    content: string,
    author: string,
}





class Post_Tables extends Model<PostTablesSchema> { }
Post_Tables.init(
    {
        id: {
            type: DataTypes.UUIDV4,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
        },
        content: {
            type: DataTypes.STRING,
        },
        author: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
    },
    {
        sequelize: database,
        tableName: "post",
        timestamps: true,
    }
);

class User_Tables extends Model<UserTablesSchema> { }
User_Tables.init(
    {
        id: {
            type: DataTypes.UUIDV4,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
        }
    },
    {
        sequelize: database,
        tableName: "user",
        timestamps: true,
    }
);




Post_Tables.belongsTo(User_Tables, {
    foreignKey: "author",
    as: "user"
})

export { User_Tables, Post_Tables }


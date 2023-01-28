"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post_Tables = exports.User_Tables = void 0;
const sequelize_1 = require("sequelize");
const database_sqlite_1 = __importDefault(require("../config/database.sqlite"));
class Post_Tables extends sequelize_1.Model {
}
exports.Post_Tables = Post_Tables;
Post_Tables.init({
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
    },
    content: {
        type: sequelize_1.DataTypes.STRING,
    },
    author: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
}, {
    sequelize: database_sqlite_1.default,
    tableName: "post",
    timestamps: true,
});
class User_Tables extends sequelize_1.Model {
}
exports.User_Tables = User_Tables;
User_Tables.init({
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
    }
}, {
    sequelize: database_sqlite_1.default,
    tableName: "user",
    timestamps: true,
});
Post_Tables.belongsTo(User_Tables, {
    foreignKey: "author",
    as: "user"
});

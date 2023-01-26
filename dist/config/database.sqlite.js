"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database = new sequelize_1.Sequelize('app', '', '', {
    storage: "./database.sqlite",
    host: "./dev.sqlite",
    dialect: "sqlite",
    logging: false,
});
exports.default = database;

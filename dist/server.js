"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_sqlite_1 = __importDefault(require("./config/database.sqlite"));
const user_1 = require("./router/user");
const post_1 = require("./router/post");
const port = 5000;
const app = (0, express_1.default)();
// Database connected
database_sqlite_1.default.sync()
    .then(() => {
    console.log("Database is connected");
})
    .catch((error) => {
    console.log("Database failed", error.message);
});
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// Backend API
app.use("/api/user", user_1.UserRouter);
app.use("/api/post", post_1.PostRouter);
// Server connected
app.listen(port, () => {
    console.log("Server is connected");
});

import express from "express";
import database from "./config/database.sqlite";
import { UserRouter } from "./router/user"
import { PostRouter } from "./router/post"

const port = 5000
const app = express()

// Database connected
database.sync()
    .then(() => {
        console.log("Database is connected")
    })
    .catch((error) => {
        console.log("Database failed", error.message)
    })

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


// Backend API
app.use("/api/user", UserRouter)
app.use("/api/post", PostRouter)

// Server connected
app.listen(port, () => {
    console.log("Server is connected")
})
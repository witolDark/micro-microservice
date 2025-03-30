import express from 'express'
import userRouter from "./main/userRouter.js"
import mongoose from "mongoose"
import UserService from "./main/userService.js"
import dotenv from "dotenv"

const app = express()
dotenv.config()
const DB_URL = process.env.DB_URL
const PORT = process.env.PORT_USER

app.use(express.json());

app.use('/api', userRouter)

const start = async () => {
    try {
        await mongoose.connect(DB_URL).then(() => UserService.createDefaultUser())
        app.listen(PORT, () => console.log(`User service running on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

await start()

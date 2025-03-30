import express from 'express'
import adminRouter from "./main/adminRoutes.js"
import mongoose from "mongoose"
import dotenv from "dotenv"

const app = express()
dotenv.config();
const DB_URL = process.env.DB_URL
const PORT = process.env.PORT_ADMIN

app.use(express.json())

app.use('/api', adminRouter)

const start = async () => {
    try {
        await mongoose.connect(DB_URL)
        app.listen(PORT, () => console.log(`Admin service running on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

await start()

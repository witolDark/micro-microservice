import express from 'express'
import coffeeRouter from "./main/coffeeRouter.js"
import mongoose from "mongoose"
import CoffeeMachineService from "./main/coffeeMachineService.js"
import dotenv from "dotenv"

const app = express()
dotenv.config()
const DB_URL = process.env.DB_URL
const PORT = process.env.PORT_COFFEE

app.use(express.json());

app.use('/api', coffeeRouter)

const start = async () => {
    try {
        await mongoose.connect(DB_URL).then(() => CoffeeMachineService.createDefaultDrinksAndIngredients())
        app.listen(PORT, () => console.log(`Coffee service running on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

await start()

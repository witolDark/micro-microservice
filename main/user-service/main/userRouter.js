import Router from "express"
import userController from "./userController.js";

const userRouter = new Router()

userRouter.patch('/user/account/:amount', userController.addFunds)
userRouter.post('/user/buy', userController.buyDrink)
userRouter.get('/user/menu', userController.getMenu)

export default userRouter;
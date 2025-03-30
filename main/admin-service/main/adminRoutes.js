import Router from "express"
import adminController from "./adminController.js"

const adminRouter = new Router()

adminRouter.post('/admin/drink', adminController.addDrink)
adminRouter.delete('/admin/drink/:name', adminController.deleteDrink)
adminRouter.post('/admin/ingredient', adminController.addIngredient)
adminRouter.delete('/admin/ingredient/:name', adminController.deleteIngredient)
adminRouter.patch('/admin/drink/:name/:amount', adminController.appendDrink)

export default adminRouter;
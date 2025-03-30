import Router from "express"
import coffeeController from "./coffeeController.js"

const coffeeRouter = new Router()

coffeeRouter.post('/drink', coffeeController.addDrink)
coffeeRouter.delete('/drink/:name', coffeeController.deleteDrink)
coffeeRouter.post('/ingredient', coffeeController.addIngredient)
coffeeRouter.delete('/ingredient/:name', coffeeController.deleteIngredient)
coffeeRouter.patch('/drink/:name/:amount', coffeeController.appendDrink)
coffeeRouter.post('/drink/buy', coffeeController.buyDrink)
coffeeRouter.get('/menu', coffeeController.getMenu)

export default coffeeRouter;
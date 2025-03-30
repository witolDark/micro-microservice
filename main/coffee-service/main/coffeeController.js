import CoffeeMachineService from "./coffeeMachineService.js"
import coffeeMachineService from "./coffeeMachineService.js"

class CoffeeController {
    async addDrink(request, response) {
        try {
            const {name, price} = request.body

            const ingredient = await CoffeeMachineService.addDrink(name, price)

            return response.status(201).json(ingredient)
        } catch (e) {
            return response.status(500).json(e.message)
        }
    }

    async buyDrink(request, response) {
        try {
            const {user, drink, ingredients, amount} = request.body
            const transaction = await CoffeeMachineService.buyDrink(user, drink, ingredients, amount)
            return response.status(200).json(transaction)
        } catch (e) {
            return response.json(e.message)
        }
    }

    async deleteDrink(request, response) {
        try {
            const name = request.params.name

            await CoffeeMachineService.deleteDrink(name)

            return response.status(200).json(`Drink ${name} deleted`)
        } catch (e) {
            return response.status(500).json(e.message)
        }
    }

    async addIngredient(request, response) {
        try {
            const {name} = request.body
            const ingredient = await CoffeeMachineService.addIngredient(name)

            return response.status(201).json(ingredient)
        } catch (e) {
            return response.json(e.message)
        }
    }

    async deleteIngredient(request, response) {
        try {
            const name = request.params.name

            await CoffeeMachineService.deleteIngredient(name)

            return response.status(200).json(`Ingredient ${name} deleted`)
        } catch (e) {
            return response.status(500).json(e.message)
        }
    }

    async appendDrink(request, response) {
        try {
            const drinkName = request.params.name
            const amount = request.params.amount
            const drink = await CoffeeMachineService.increaseAmount(drinkName, amount)

            return response.status(200).json(drink)
        } catch (e) {
            return response.status(500).json(e.message)
        }
    }

    async getMenu(request, response) {
        try {
            const menu = await coffeeMachineService.getMenu()

            return response.status(200).json(menu)
        } catch (e) {
            return response.json(e.message)
        }
    }
}

export default new CoffeeController()
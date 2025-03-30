import AdminService from "./adminService.js"

class AdminController {
    async addDrink(request, response) {
        try {
            const {name, price} = request.body

            const ingredient = await AdminService.addDrink(name, price)

            return response.status(201).json(ingredient)
        } catch (e) {
            return response.status(500).json(e.message)
        }
    }

    async deleteDrink(request, response) {
        try {
            const name = request.params.name

            await AdminService.deleteDrink(name)

            return response.status(200).json(`Drink ${name} deleted`)
        } catch (e) {
            return response.status(500).json(e.message)
        }
    }

    async addIngredient(request, response) {
        try {
            const {name} = request.body
            const ingredient = await AdminService.addIngredient(name)

            return response.status(201).json(ingredient)
        } catch (e) {
            return response.json(e.message)
        }
    }

    async deleteIngredient(request, response) {
        try {
            const name = request.params.name

            await AdminService.deleteIngredient(name)

            return response.status(200).json(`Ingredient ${name} deleted`)
        } catch (e) {
            return response.status(500).json(e.message)
        }
    }

    async appendDrink(request, response) {
        try {
            const drinkName = request.params.name
            const amount = request.params.amount
            const drink = await AdminService.appendDrink(drinkName, amount)

            return response.status(200).json(drink)
        } catch (e) {
            return response.status(500).json(e.message)
        }
    }
}

export default new AdminController()
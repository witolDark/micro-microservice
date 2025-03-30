import userService from "./userService.js"

class UserController {
    async addFunds(request, response) {
        try {
            const amount = request.params.amount
            const user = await userService.addFunds(amount)

            return response.status(200).json(user)
        } catch (e) {
            return response.json(e.message)
        }
    }

    async buyDrink(request, response) {
        try {
            const {drink, ingredients, amount} = request.body
            const transaction = await userService.buyDrink(drink, ingredients, amount)
            return response.status(200).json(transaction)
        } catch (e) {
            return response.json(e.message)
        }
    }

    async getMenu(request, response) {
        try {
            const menu = await userService.getMenu(request)

            return response.status(200).json(menu)
        } catch (e) {
            return response.json(e.message)
        }
    }
}

export default new UserController()
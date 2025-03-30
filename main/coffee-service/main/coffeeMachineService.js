import {DrinkResponseDTO} from "../../shared/dto/drinkResponseDto.js"
import Drink from "./drinkModel.js"
import Ingredient from "./ingredientModel.js"
import {DrinkDTO} from "../../shared/dto/drinkDto.js"
import {IngredientDTO} from "../../shared/dto/ingredientDto.js"
import DefaultDrinks from "./defaultDrinks.js"
import DefaultIngredients from "./defaultIngredients.js"

class CoffeeMachineService {
    async createDefaultDrinksAndIngredients() {
        for (const drink in DefaultDrinks) {
            try {
                const existingDrink = await Drink.findOne({name: drink})
                if (!existingDrink) {
                    await Drink.create({name: drink, price: Number(DefaultDrinks[drink]), amount: 5})
                }
            } catch (e) {
                console.log(e)
            }
        }

        for (const ingredient of DefaultIngredients) {
            try {
                const existingIngredient = await Ingredient.findOne({name: ingredient})
                if (!existingIngredient) {
                    await Ingredient.create({name: ingredient})
                }
            } catch (e) {
                console.log(e)
            }
        }
    }

    async increaseAmount(drinkName, amount) {
        const drink = await Drink.findOneAndUpdate(
            {name: drinkName},
            {$inc: {amount: Number(amount)}},
            {new: true}
        )

        return new DrinkDTO(drink, amount)
    }

    async buyDrink(user, drinkName, ingredients, amount) {
        let response = []
        for (let i = 0; i < Number(amount); i++) {
            let ingredientsTemp = []
            for (let j = 0; j < ingredients.length; j++) {
                const ingredient = await this.getIngredient(ingredients[j])
                if (ingredient) {
                    ingredientsTemp.push(ingredient)
                }
            }

            const drink = await this.getDrink(drinkName)

            if (!drink) {
                throw new Error("Could not find drink")
            }

            if (user.account >= drink.price) {
                if (drink.amount <= 0) {
                    response.push("Drinks have ended")
                    break
                }
                drink.amount--
                await drink.save()
                const boughtDrink = new DrinkDTO(drink)
                response.push(new DrinkResponseDTO(user._id, boughtDrink, ingredientsTemp))
            } else {
                throw new Error(`Not enough of money. Account: ${user.account} Price: ${drink.price}`)
            }
        }
        await user.save()
        return response
    }

    async addDrink(name, price) {
        const drink = await Drink.create({name, price})

        if (drink) {
            return new DrinkDTO(drink)
        }
    }

    async getDrink(drinkName) {
        return Drink.findOne({name: drinkName})
    }

    async deleteDrink(drinkName) {
        return Drink.deleteOne({name: drinkName})
    }

    async addIngredient(newIngredient) {
        const ingredient = await Ingredient.create({name: newIngredient})

        if (ingredient) {
            return new IngredientDTO(newIngredient)
        }
    }

    async getIngredient(ingredientName) {
        return Ingredient.findOne({name: ingredientName})
    }

    async deleteIngredient(ingredientName) {
        return Ingredient.deleteOne({name: ingredientName})
    }

    async getMenu() {
        return {
            drinks: [...await Drink.find({})],
            ingredients: [...await Ingredient.find({})]
        }
    }
}

export default new CoffeeMachineService()
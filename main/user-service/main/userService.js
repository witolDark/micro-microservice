import User from "./userModel.js"
import {UserDTO} from "./userDto.js"

class UserService {
    async createDefaultUser() {
        const user = await User.findOne({})

        if (!user) {
            await User.create({account: 0})
        }
    }

    async addFunds(amount) {
        const user = await User.findOneAndUpdate(
            {},
            {$inc: {account: Number(amount)}},
            {new: true}
        )

        if (!user) {
            throw new Error("User not found.")
        }

        return new UserDTO(user)
    }

    async buyDrink(drink, ingredients, amount) {
        const user = await User.findOne({})
        const body = {
            user, drink, ingredients, amount
        }

        const request = await fetch('http://localhost:5052/api/drink/buy', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(body)
        })

        const requestJson = await request.json()

        if (request.ok) {
            console.log(Number(requestJson[requestJson.length - 1]))
            console.log(typeof Number(requestJson[requestJson.length - 1]))
            user.account -= Number(requestJson[requestJson.length - 1])
            await user.save()
        }

        return requestJson
    }

    async getMenu() {
        const request = await fetch('http://localhost:5052/api/menu', {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })

        return await request.json()
    }
}

export default new UserService()
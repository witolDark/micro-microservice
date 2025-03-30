class AdminService {
    async addDrink(name, price) {
        const body = {name, price}

        const response = await fetch(`http://localhost:5052/api/drink`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(body)
        })

        return await response.json()
    }

    async deleteDrink(name) {
        const response = await fetch(`http://localhost:5052/api/drink/${name}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            }
        })

        return await response.json()
    }

    async addIngredient(name) {
        const body = {name}
        const response = await fetch(`http://localhost:5052/api/ingredient`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(body)
        })

        return await response.json()
    }

    async deleteIngredient(name) {
        const response = await fetch(`http://localhost:5052/api/ingredient/${name}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            }
        })

        return await response.json()
    }

    async appendDrink(drinkName, amount) {
        const response = await fetch(`http://localhost:5052/api/drink/${drinkName}/${amount}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            }
        })

        return await response.json()
    }
}

export default new AdminService()
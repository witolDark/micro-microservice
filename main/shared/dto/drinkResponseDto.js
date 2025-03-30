export class DrinkResponseDTO {
    userId;
    drink;
    ingredients;

    constructor(userId, drink, ingredients) {
        this.userId = userId;
        this.drink = drink;
        this.ingredients = ingredients;
    }
}
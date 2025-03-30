export class DrinkDTO {
    name;
    price;
    remaining;

    constructor(drink) {
        this.name = drink.name;
        this.price = drink.price;
        this.remaining = drink.amount;
    }
}
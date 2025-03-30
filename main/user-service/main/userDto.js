export class UserDTO {
    id;
    account;

    constructor(model) {
        this.id = model._id;
        this.account = model.account;
    }
}
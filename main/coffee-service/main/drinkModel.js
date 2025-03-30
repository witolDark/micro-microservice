import mongoose from 'mongoose'

const DrinkSchema = new mongoose.Schema({
    name: {type: String, unique: true, required: true},
    price: {type: Number, required: true},
    amount: {type: Number, default: 0}
})

export default mongoose.model('Drink', DrinkSchema)
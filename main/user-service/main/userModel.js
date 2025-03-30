import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    account: {type: Number}
})

export default mongoose.model('User', UserSchema)
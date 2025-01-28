import mongoose, { mongo } from "mongoose"

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    tel: {type: String},
    role: {type: String, enum: ['admin', 'employee'], required: true},
    image: {type: String},
    
}, {timestamps: true})

const User = mongoose.model('User', userSchema)

export default User
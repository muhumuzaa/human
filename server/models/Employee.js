import mongoose, { Schema } from "mongoose";
import User from "./User.js";

const employeeSchema = mongoose.Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true}, 
    department: {type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true},
}, {timestamps: true})


employeeSchema.pre("remove", async function (next) {
    try{
        if(this.userId){
            await User.findByIdAndDelete(this.userId);
        }
        next();
    }
    
    catch(error){
        next(error)
    }
})

const Employee = mongoose.model('Employee', employeeSchema)
export default Employee

import mongoose from "mongoose";

const depSchema = mongoose.Schema({
    dep_name: {type: String, required: true},
    description: {type: String, required: true},
    lead: {type: String},
    employees: {type: Number},
    

}, {timestamps: true})

export const Department = mongoose.model('Department', depSchema)

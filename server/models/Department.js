
import mongoose from "mongoose";

const depSchema = mongoose.Schema({
    dep_name: {type: String, required: true},
    description: {type: String, required: true},
    lead: {type: String},
    employees: {type: Number},
    createAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}

})

export const Department = mongoose.model('Department', depSchema)

import mongoose, { Schema } from "mongoose";

const leaveSchema = mongoose.Schema({
    employeeId: {type: Schema.Types.ObjectId, ref: 'Employee', required: true},
    leaveType: {type: String, enum: ['Sick Leave', 'Casual Leave', 'Annual Leave'], required: true},
    fromDate: {type: Date, required: true},
    toDate: {type: Date, required: true},
    status: {type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending'}
}, {timestamps: true})

export const Leave = mongoose.model('Leave', leaveSchema)

import { Department } from "../models/Department.js";
import Employee from "../models/Employee.js";
import Leave from "../models/Leave.js";
import Salary from "../models/Salary.js";

const getSummary = async (req, res) => {
  try {
    const departments = await Department.countDocuments();
    const employees = await Employee.countDocuments();

    const salaries = await Salary.aggregate([
      { $group: { _id: null, totalSalary: { $sum: "$netSalary" } } },
    ]);

    const totalSalary = salaries[0]?.totalSalary || 0;

    const leaveStatus = await Leave.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    const totalLeavesApplied = leaveStatus.reduce(
        (acc, item) => acc + item.count, 0
    )

    const leaveSummary = {
      appliedFor: totalLeavesApplied,
      approved: leaveStatus.find((item) => item._id === "Approved")?.count || 0,
      pending: leaveStatus.find((item) => item._id === "Pending")?.count || 0,
      rejected: leaveStatus.find((item) => item._id === "Rejected")?.count || 0,
    };
    // console.log("leaves: ", totalLeavesApplies);
    // console.log("deps: ", departments);
    // console.log("emps: ", employees);
    
    return res.status(200).json({success: true, departments, employees, totalSalary, leaveSummary})
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Server error fetching summary data" });
  }
};
export default getSummary;

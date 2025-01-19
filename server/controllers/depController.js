import { Department } from "../models/Department.js";

const addDepartment = async (req, res) => {
  try {
    if (Array.isArray(req.body)) {
      const departments = await Department.insertMany(
        req.body.map((dep) => ({
          dep_name: dep.dep_name,
          description: dep.description,
          lead: dep.lead || "Not Assigned",
          employees: dep.employees || 0,
        }))
      );
      return res.status(200).json({
        success: true,
        message: `Added ${departments.length} departments to the database`,
        departments,
      });
    } else {
      const {
        dep_name,
        description,
        lead = "Not Assigned",
        employees = 0,
      } = req.body;

      if (!dep_name || !description) {
        return res.status(400).json({
          success: false,
          error: "Department name and description are required",
        });
      }

      const newDep = new Department({ dep_name, description, lead, employees });
      await newDep.save();

      return res.status(201).json({
        success: true,
        department: newDep,
        message: "Successfully added new department",
      });
    }
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ success: false, error: "Server error while adding department" });
  }
};

const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    if (!departments || departments.length === 0) {
      return res
        .status(404)
        .json({ success: false, error: "No departments found" });
    }
    if (departments) {
      return res.status(200).json({ success: true, departments });
    } else {
      return res.status(404).json({
        success: false,
        error: "Error fetching the list of departments",
      });
    }
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, error: "Server error fetching department list" });
  }
};

const delDepartment = async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res
        .status(404)
        .json({ success: false, error: "There is no department ID provided" });
    }
    const depToDelete = await Department.findByIdAndDelete(id);
    if (!depToDelete) {
      return res
        .status(404)
        .json({ success: false, error: "Department was not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Department deleted successfully" });
  } catch (error) {
    console.log(error.message);

    return res
      .status(500)
      .json({ success: false, error: "Server error on deleting department" });
  }
};

const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { dep_name, description, lead, employees } = await req.body;
    if (!id) {
      return res
        .status(404)
        .json({ success: false, error: "Dept id for editing not provided" });
    }
    if (!dep_name || !description) {
      res
        .status(404)
        .json({ success: false, error: "All field shoes be filled" });
    }
    const updatedDep = await Department.findByIdAndUpdate(
      id,
      { dep_name, description, lead, employees },
      { new: true }
    );
    if (!updatedDep) {
      return res.status(404).json({
        success: false,
        error: `Department with Id -${id} can't be found in the database`,
      });
    }
    return res.status(200).json({
      success: true,
      department: updatedDep,
      message: `Department ${id} updated successfully`,
    });
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ success: false, error: "Server error when updating department" });
  }
};
export { addDepartment, getDepartments, delDepartment, updateDepartment };

import { Department } from "../models/Department.js";

const addDepartment = async (req, res) => {
  try {
    const { dep_name, description } = req.body;
    if (!req.body.dep_name || !req.body.description) {
      return res
        .status(404)
        .json({ success: false, error: "A field is missing data" });
    }
    const newDep = new Department({
      dep_name,
      description,
    });
    await newDep.save();
    return res
      .status(200)
      .json({
        success: true,
        department: newDep,
        message: "Successfully added new department",
      });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Server error while adding department" });
  }
};

const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    if (departments) {
      return res.status(200).json({ success: true, departments });
    } else {
      return res
        .status(404)
        .json({
          success: false,
          error: "Error fetching the list of departments",
        });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Server error fetching department list" });
  }
};

const delDepartment = async (req, res) => {
  try {
    const { id } = await req.query;
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
    return res
      .status(500)
      .json({ success: false, error: "Server error on deleting department" });
  }
};

const updateDepartment = async(req, res) =>{
    try{
        const { id } = await req.params
        const {dep_name, description} = await req.body
    if(!id){
        return res.status(404).json({success: false, error: 'Dept id for editing not provided'})
    }
    if(!dep_name || !description){
      res.status(404).json({success: false, error: 'All field shoes be filled'})
    }
    const updatedDep = await Department.findByIdAndUpdate(id, {dep_name, description}, {new: true})
    if(!updatedDep){
      return res.status(404).json({success: false, error: `Department with Id -${id} can't be found in the database`})
    }
    return res.status(200).json({success: true, department: updatedDep, message: `Department ${id} updated successfully`})
    

    }catch(error){
      console.error(error)
        return res.status(500).json({success: false, error: 'Server error when updating department'})
    }
    
}
export { addDepartment, getDepartments, delDepartment,updateDepartment };

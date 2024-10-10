const { status } = require('express/lib/response');
const Employee = require('../model/Employee')


//GET /api/v1/emp/employees User can get all employee list

exports.fetchAll = async (req, res) => {
    try{
        const employees = await Employee.find();
        res.status(200).json(employees)
    }
    catch(err){
        res.status(400).json({status: false, message: err.message})
    }
}

// POST /api/v1/emp/employees User can create new employee

exports.createEmployee = async (req, res) => {
    const { first_name,
            last_name,
            email,
            position, 
            salary, 
            date_of_joining, 
            department 
        } = req.body;
    
    const newEmployee = new Employee({ 
        first_name, 
        last_name, 
        email, 
        position, 
        salary, 
        date_of_joining, 
        department });
    try {
        await newEmployee.save();
        res.status(201).json({ message: "Employee created successfully.", employee_id: newEmployee._id });
    } catch (error) {
        res.status(400).json({ status: false, message: error.message });
    }
};

//GET /api/v1/emp/employees/{eid} User can get employee details by employee id

exports.detailsById = async(req, res) => {
    try{
        const employee = await Employee.findById(req.params.employee_id)
        if(!employee) {
            return res.status(400).json({status: false, message: "Employee not Found"})
        }
        res.status(200).json({employee})
    } 
    catch(err) {
        res.status(500).json({status: false, message: err.message })
    };
};

//PUT   /api/v1/emp/employees/{eid} User can update employee details

exports.updateById = async(req, res) => {
    try{
        const updatedEmployee = await Employee.findByIdAndUpdate(req.params.employee_id, req.body, { new: true}); // eid
        if(!updatedEmployee) {
            return res.status(404).json({status: false,message: "Employee not Found"});
        }
        res.status(200).json(updatedEmployee)
    }
    catch(err){
        return res.status(404).json({status: false,message: "Employee not Found"});
    }
};

//DELETE /api/v1/emp/employees?eid=xxx User can delete employee by employee id

exports.deleteById = async(req, res) => {
    try{
        const employee_id = req.body;
        const deleteEmployee = await Employee.findByIdAndDelete(employee_id);
        if(!deleteEmployee){
            res.status(404).json({status:false, message: "Employee not Found"});
        }
        res.status(200).json({message: "Employee Successfully Deleted"})
    }
    catch(err){
        res.status(500).json({status: false, message: err.message});
    }
}
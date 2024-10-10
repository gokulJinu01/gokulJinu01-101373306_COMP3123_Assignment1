const Employee = require('../model/Employee')

// POST /api/v1/emp/employees

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
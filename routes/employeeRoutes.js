const express = require('express');
const { createEmployee } = require('../controllers/employeeController');
const router = express.Router();

// Define your employee routes

router.post('/employees', createEmployee);


module.exports = router; // Ensure you are exporting the router correctly

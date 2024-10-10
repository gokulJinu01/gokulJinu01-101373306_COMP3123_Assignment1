const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./Routes/userRoute'); // Import user routes
const employeeRoutes = require('./Routes/employeeRoute'); // Import employee routes
const Employee = require('./Models/Employee');
const DB_URL = "mongodb+srv://Gokuljinu:tyfGCV&3465@mycluster.trgzd.mongodb.net/?retryWrites=true&w=majority&appName=MyCluster"; // Your MongoDB Atlas URL

const app = express();

// Middleware to parse URL-encoded and JSON data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB Atlas
mongoose.Promise = global.Promise;
mongoose.connect(DB_URL).then(() => {
    console.log("Successfully connected to the MongoDB Atlas database.");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// Root route
app.get('/', (req, res) => {
    res.send("<h3>Full Stack Development - COMP3123 - GOKUL JINU | 101373306</h3>");
});

// Use imported routes without prefix
app.use('/user', userRoutes); // All routes in userRoute.js will start with /user
app.use('/emp', employeeRoutes); // All routes in employeeRoute.js will start with /emp

// Centralized error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Start the server
app.listen(8081, () => {
    console.log("Server is listening on port 8081");
});

app.post('/employees', async (req, res) => {
    const { first_name, last_name, email, position, Salary, date_of_joining, department } = req.body;

    const employee = new Employee({
        first_name,
        last_name,
        email,
        position,
        Salary,
        date_of_joining,
        department,
    });

    try {
        const newEmployee = await employee.save();
        res.status(201).json(newEmployee);
    } catch (error) {
        res.status(500).json({ message: 'Error creating employee' });
    }
});
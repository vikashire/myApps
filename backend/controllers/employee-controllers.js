const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const fastcsv = require('fast-csv');
const path = require('path');

// Define the folder path one level above
const folderPath = path.join(__dirname, '..', 'csvFolder');

// Check if the folder exists
if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath, { recursive: true }); // Create the folder if it doesn't exist
}

// Define the path for the CSV file inside the folder
const csvFilePath = path.join(folderPath, 'employee.csv');

// Hardcoded employee (In production, you would get this from a database)
const employees = [
    {
        id: 1,
        email: 'test@test.com',
        password: bcrypt.hashSync('123123', 10), // Hashed password
    }
];
// JWT Secret (Use a more secure method for production)
const JWT_SECRET = 'jwt_secret_key';

const login = async (req, res, next) => {
    const { email, password } = req.body;

    // Check if the employee exists
    const employee = employees.find(u => u.email === email);
    if (!employee) {
        return res.status(400).json({ message: 'User not found' });
    }

    // Compare passwords using bcrypt
    if (!bcrypt.compareSync(password, employee.password)) {
        return res.status(400).json({ message: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign(
        { id: employee.id, email: employee.email },
        JWT_SECRET,
        { expiresIn: '1h' } // Token expiration time (1 hour)
    );

    return res.status(200).json({ message: 'Login successful', token });
};

const addEmployee = async (req, res, next) => {
    const { name, id, department } = req.body;

    // Data validation
    if (!name || !id || !department) {
        return res.status(400).json({ message: 'Name, ID, and Department are required!' });
    }

    // Data to be saved
    const newEmployee = { name, id, department };

    // Check if CSV file exists
    const fileExists = fs.existsSync(csvFilePath);

    // Open the CSV file for appending or create a new one
    const stream = fs.createWriteStream(csvFilePath, { flags: 'a' });
    // If the file does not exist, write headers and a newline
    if (!fileExists) {
        stream.write('Id,Name,Department\n');
    }
    // Write the new employee record followed by a newline
    stream.write(`${newEmployee.id},${newEmployee.name},${newEmployee.department}\n`);

    stream.end();

    // Respond once writing is complete
    stream.on('finish', () => {
        res.status(201).json({ message: 'Employee added successfully', employee: newEmployee });
    });

    stream.on('error', (err) => {
        console.error('Error writing to CSV:', err);
        res.status(500).json({ message: 'Failed to add employee' });
    });
};

const getEmployee = async (req, res, next) => {
    const employee = [];

    // Check if the file exists before reading
    if (!fs.existsSync(csvFilePath)) {
        return res.status(404).json({ message: 'No employee found' });
    }

    // Parse the CSV file and read employee data
    fs.createReadStream(csvFilePath)
        .pipe(fastcsv.parse({ headers: true }))
        .on('data', (row) => employee.push(row)) // Collect data in an array
        .on('end', () => {
            // Send the parsed data as a response
            res.status(200).json({ employee });
        })
        .on('error', (err) => {
            console.error('Error reading CSV:', err);
            res.status(500).json({ message: 'Failed to read employee data' });
        });
};


exports.login = login;
exports.addEmployee = addEmployee;
exports.getEmployee = getEmployee;
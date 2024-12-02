const express = require('express');
const multer = require('multer');
const employeeController = require('../controllers/employee-controllers');

// Multer configuration for handling form-data
// You can also configure file storage if needed
const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });


const router = express.Router();

router.get('/', employeeController.getEmployee);
router.post('/login', employeeController.login);
router.post('/add-employee',upload.none(), employeeController.addEmployee);
module.exports = router;

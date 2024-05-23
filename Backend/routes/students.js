const express = require('express');
const { body, validationResult } = require('express-validator');
const {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent
} = require('../controller/studentcontroller');
const router = express.Router();

// Create a new student with validation
router.post(
  '/',
  [
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('age').isInt({ min: 1 }).withMessage('Age must be a positive integer'),
    body('major').notEmpty().withMessage('Major is required')
  ],
  (req, res, next) => {
    console.log(req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  createStudent
);

// Get all students
router.get('/', getStudents);

// Get a single student by ID
router.get('/:id', getStudentById);

// Update a student by ID with validation
router.put(
  '/:id',
  [
    body('firstName').optional().notEmpty().withMessage('First name is required'),
    body('lastName').optional().notEmpty().withMessage('Last name is required'),
    body('age').optional().isInt({ min: 1 }).withMessage('Age must be a positive integer'),
    body('major').optional().notEmpty().withMessage('Major is required')
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  updateStudent
);

// Delete a student by ID
router.delete('/:id', deleteStudent);

module.exports = router;

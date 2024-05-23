const Student = require('../model/Student');

// Create a new student
const createStudent = async (req, res) => {
  const { firstName, lastName, age, major } = req.body;
  try {
    const newStudent = new Student({ firstName, lastName, age, major });
    const student = await newStudent.save();
    res.status(201).json(student);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error: Could not create student' });
  }
};

// Get all students
const getStudents = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const sortField = req.query.sortField || 'firstName';
  const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1;
  const searchName = req.query.name || '';
  const searchId = req.query.id || '';

  try {
    const query = {};

    if (searchName) {
      query.$or = [
        { firstName: { $regex: searchName, $options: 'i' } },
        { lastName: { $regex: searchName, $options: 'i' } }
      ];
    }

    if (searchId) {
      query._id = searchId;
    }

    const students = await Student.find(query)
      .sort({ [sortField]: sortOrder })
      .skip((page - 1) * limit)
      .limit(limit);

    const totalStudents = await Student.countDocuments(query);

    res.status(200).json({
      students,
      totalPages: Math.ceil(totalStudents / limit),
      currentPage: page
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error: Could not retrieve students' });
  }
};




// Get a single student by ID
const getStudentById = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error: Could not retrieve student' });
  }
};

// Update a student by ID
const updateStudent = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, age, major } = req.body;
  try {
    const student = await Student.findByIdAndUpdate(
      id,
      { firstName, lastName, age, major },
      { new: true }
    );
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error: Could not update student' });
  }
};

// Delete a student by ID
const deleteStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Student.findByIdAndDelete(id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error: Could not delete student' });
  }
};

module.exports = {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent
};

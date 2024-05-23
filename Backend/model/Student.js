const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    required: true,
    min: 1
  },
  major: {
    type: String,
    required: true,
    trim: true
  },
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;

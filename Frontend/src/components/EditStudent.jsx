import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { VStack, FormControl, FormLabel, Input, Button, useToast, Box, Flex, FormErrorMessage, Select } from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';

// EditStudent component to handle editing an existing student
const EditStudent = () => {
  // Extract the student ID from the URL parameters
  const { id } = useParams();
  // State for form data
  const [formData, setFormData] = useState({ firstName: '', lastName: '', age: '', major: '' });
  // State for form validation errors
  const [errors, setErrors] = useState({});
  // Chakra UI toast for notifications
  const toast = useToast();
  // Hook to navigate programmatically
  const navigate = useNavigate();

  // Fetch the student data when the component mounts or the ID changes
  useEffect(() => {
    fetchStudent();
  }, [id]);

  // Function to fetch the student data
  const fetchStudent = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/students/${id}`);
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching student:', error);
      toast({
        title: 'Error fetching student.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  // Function to validate the form data
  const validateForm = () => {
    let formErrors = {};
    if (!formData.firstName) formErrors.firstName = 'First name is required';
    if (!formData.lastName) formErrors.lastName = 'Last name is required';
    if (!formData.age || isNaN(formData.age)) formErrors.age = 'Valid age is required';
    if (!formData.major) formErrors.major = 'Major is required';
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // Function to handle the form submission for editing a student
  const handleEditStudent = async () => {
    // Validate the form before proceeding
    if (!validateForm()) {
      toast({
        title: 'Please fix the errors in the form.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    // Make a PUT request to update the student
    try {
      await axios.put(`http://localhost:3000/api/students/${id}`, formData);
      toast({
        title: 'Student updated.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      // Navigate to the home page after successful update
      navigate('/');
    } catch (error) {
      console.error('Error updating student:', error);
      toast({
        title: 'Error updating student.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    // Flex container to center the form
    <Flex justify="center" align="center" height="100vh">
      {/* Box container for the form with styling */}
      <Box mt={5} width="400px" p={6} boxShadow="md" borderRadius="md">
        {/* VStack for vertical stacking of form elements */}
        <VStack spacing={4} align="stretch">
          {/* Form control for the first name */}
          <FormControl id="firstName" isInvalid={errors.firstName}>
            <FormLabel>First Name</FormLabel>
            {/* Input field for first name */}
            <Input
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            />
            {/* Display error message if first name is invalid */}
            <FormErrorMessage>{errors.firstName}</FormErrorMessage>
          </FormControl>
          
          {/* Form control for the last name */}
          <FormControl id="lastName" isInvalid={errors.lastName}>
            <FormLabel>Last Name</FormLabel>
            {/* Input field for last name */}
            <Input
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            />
            {/* Display error message if last name is invalid */}
            <FormErrorMessage>{errors.lastName}</FormErrorMessage>
          </FormControl>
          
          {/* Form control for the age */}
          <FormControl id="age" isInvalid={errors.age}>
            <FormLabel>Age</FormLabel>
            {/* Input field for age */}
            <Input
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            />
            {/* Display error message if age is invalid */}
            <FormErrorMessage>{errors.age}</FormErrorMessage>
          </FormControl>
          
          {/* Form control for the major */}
          <FormControl id="major" isInvalid={errors.major}>
            <FormLabel>Major</FormLabel>
            {/* Select dropdown for major */}
            <Select
              placeholder="Select major"
              value={formData.major}
              onChange={(e) => setFormData({ ...formData, major: e.target.value })}
            >
              {/* Options for the select dropdown */}
              <option value="Computer Science">Computer Science</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Biology">Biology</option>
              <option value="Engineering">Engineering</option>
              <option value="Software Engineering">Software Engineering</option>
            </Select>
            {/* Display error message if major is invalid */}
            <FormErrorMessage>{errors.major}</FormErrorMessage>
          </FormControl>
          
          {/* Button to submit the form and save changes */}
          <Button colorScheme="blue" onClick={handleEditStudent}>Save Changes</Button>
        </VStack>
      </Box>
    </Flex>
  );
};

// Exporting the EditStudent component
export default EditStudent;

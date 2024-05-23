import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { VStack, FormControl, FormLabel, Input, Button, useToast, Box, Flex, FormErrorMessage, Select } from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';

const EditStudent = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({ firstName: '', lastName: '', age: '', major: '' });
  const [errors, setErrors] = useState({});
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudent();
  }, [id]);

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

  const validateForm = () => {
    let formErrors = {};
    if (!formData.firstName) formErrors.firstName = 'First name is required';
    if (!formData.lastName) formErrors.lastName = 'Last name is required';
    if (!formData.age || isNaN(formData.age)) formErrors.age = 'Valid age is required';
    if (!formData.major) formErrors.major = 'Major is required';
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleEditStudent = async () => {
    if (!validateForm()) {
      toast({
        title: 'Please fix the errors in the form.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    try {
      await axios.put(`http://localhost:3000/api/students/${id}`, formData);
      toast({
        title: 'Student updated.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
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
    <Flex justify="center" align="center" height="100vh">
      <Box mt={5} width="400px" p={6} boxShadow="md" borderRadius="md">
        <VStack spacing={4} align="stretch">
          <FormControl id="firstName" isInvalid={errors.firstName}>
            <FormLabel>First Name</FormLabel>
            <Input
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            />
            <FormErrorMessage>{errors.firstName}</FormErrorMessage>
          </FormControl>
          <FormControl id="lastName" isInvalid={errors.lastName}>
            <FormLabel>Last Name</FormLabel>
            <Input
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            />
            <FormErrorMessage>{errors.lastName}</FormErrorMessage>
          </FormControl>
          <FormControl id="age" isInvalid={errors.age}>
            <FormLabel>Age</FormLabel>
            <Input
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            />
            <FormErrorMessage>{errors.age}</FormErrorMessage>
          </FormControl>
          <FormControl id="major" isInvalid={errors.major}>
            <FormLabel>Major</FormLabel>
            <Select
              placeholder="Select major"
              value={formData.major}
              onChange={(e) => setFormData({ ...formData, major: e.target.value })}
            >
              <option value="Computer Science">Computer Science</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Biology">Biology</option>
              <option value="Engineering">Engineering</option>
              <option value="Software Engineering">Software Engineering</option>
            </Select>
            <FormErrorMessage>{errors.major}</FormErrorMessage>
          </FormControl>
          <Button colorScheme="blue" onClick={handleEditStudent}>Save Changes</Button>
        </VStack>
      </Box>
    </Flex>
  );
};

export default EditStudent;
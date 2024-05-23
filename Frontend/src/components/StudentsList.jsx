import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Thead, Tbody, Tr, Th, Td, IconButton, useToast, Box, Button, HStack, Text, Input } from '@chakra-ui/react';
import { EditIcon, DeleteIcon, ArrowUpDownIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

// StudentsList component to display and manage the list of students
const StudentsList = () => {
  // State to store the list of students
  const [students, setStudents] = useState([]);
  // State to manage the current page in pagination
  const [currentPage, setCurrentPage] = useState(1);
  // State to manage the total number of pages in pagination
  const [totalPages, setTotalPages] = useState(1);
  // State to manage the sorting field
  const [sortField, setSortField] = useState('firstName');
  // State to manage the sorting order (ascending/descending)
  const [sortOrder, setSortOrder] = useState('asc');
  // State to manage the search query by name
  const [searchName, setSearchName] = useState('');
  // State to manage the search query by ID
  const [searchId, setSearchId] = useState('');
  // Chakra UI toast for notifications
  const toast = useToast();
  // Hook to navigate programmatically
  const navigate = useNavigate();

  // Effect to fetch students when the component mounts or dependencies change
  useEffect(() => {
    fetchStudents(currentPage, sortField, sortOrder, searchName, searchId);
  }, [currentPage, sortField, sortOrder, searchName, searchId]);

  // Function to fetch students from the server
  const fetchStudents = async (page, sortField, sortOrder, searchName, searchId) => {
    try {
      // API request to get students with pagination, sorting, and search parameters
      const response = await axios.get('http://localhost:3000/api/students', {
        params: {
          page,
          limit: 5,
          sortField,
          sortOrder,
          name: searchName,
          id: searchId,
        },
      });

      // Check if the response contains the students data
      if (response.data.students) {
        // Update the students and total pages state
        setStudents(response.data.students);
        setTotalPages(response.data.totalPages);
      } else {
        console.error('Invalid data format:', response.data);
        // Show an error toast if the data format is invalid
        toast({
          title: 'Error fetching students. Invalid data format.',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error fetching students:', error);
      // Show an error toast if there is an error fetching the students
      toast({
        title: 'Error fetching students.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  // Function to handle deleting a student
  const handleDeleteStudent = async (id) => {
    try {
      // API request to delete a student by ID
      await axios.delete(`http://localhost:3000/api/students/${id}`);
      // Update the students state by filtering out the deleted student
      setStudents(students.filter(student => student._id !== id));
      // Show a success toast after deleting a student
      toast({
        title: 'Student deleted.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error deleting student:', error);
      // Show an error toast if there is an error deleting the student
      toast({
        title: 'Error deleting student.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  // Function to handle sorting by a specific field
  const handleSort = (field) => {
    // Toggle the sorting order if the field is already sorted in ascending order
    const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(order);
  };

  // Function to go to the previous page
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Function to go to the next page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function to handle search by name input change
  const handleSearchNameChange = (e) => {
    setSearchName(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  // Function to handle search by ID input change
  const handleSearchIdChange = (e) => {
    setSearchId(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  return (
    <Box overflowX="auto" p={4}>
      {/* Search input fields */}
      <HStack spacing={4} mb={4} alignItems="center">
        <Input
          placeholder="Search by name"
          value={searchName}
          onChange={handleSearchNameChange}
          width="200px"
        />
        <Input
          placeholder="Search by ID"
          value={searchId}
          onChange={handleSearchIdChange}
          width="200px"
        />
      </HStack>
      {/* Table to display students */}
      <Table variant="striped" colorScheme="teal" mt={5}>
        <Thead>
          <Tr>
            {/* Column for ID with sorting functionality */}
            <Th>
              ID
              <IconButton
                icon={<ArrowUpDownIcon />}
                size="sm"
                onClick={() => handleSort('_id')}
                aria-label="Sort by ID"
                ml={2}
              />
            </Th>
            {/* Column for first name with sorting functionality */}
            <Th>
              First Name
              <IconButton
                icon={<ArrowUpDownIcon />}
                size="sm"
                onClick={() => handleSort('firstName')}
                aria-label="Sort by First Name"
                ml={2}
              />
            </Th>
            {/* Column for last name with sorting functionality */}
            <Th>
              Last Name
              <IconButton
                icon={<ArrowUpDownIcon />}
                size="sm"
                onClick={() => handleSort('lastName')}
                aria-label="Sort by Last Name"
                ml={2}
              />
            </Th>
            {/* Column for age with sorting functionality */}
            <Th>
              Age
              <IconButton
                icon={<ArrowUpDownIcon />}
                size="sm"
                onClick={() => handleSort('age')}
                aria-label="Sort by Age"
                ml={2}
              />
            </Th>
            {/* Column for major with sorting functionality */}
            <Th>
              Major
              <IconButton
                icon={<ArrowUpDownIcon />}
                size="sm"
                onClick={() => handleSort('major')}
                aria-label="Sort by Major"
                ml={2}
              />
            </Th>
            {/* Column for actions (edit/delete) */}
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {/* Map through the students array to display each student */}
          {students.map((student) => (
            <Tr key={student._id}>
              <Td>{student._id}</Td>
              <Td>{student.firstName}</Td>
              <Td>{student.lastName}</Td>
              <Td>{student.age}</Td>
              <Td>{student.major}</Td>
              <Td>
                {/* Edit button */}
                <IconButton icon={<EditIcon />} mr={2} onClick={() => navigate(`/edit/${student._id}`)} />
                {/* Delete button */}
                <IconButton icon={<DeleteIcon />} onClick={() => handleDeleteStudent(student._id)} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {/* Pagination controls */}
      <HStack spacing={4} mt={4} justify="center" alignItems="center">
        <Button onClick={handlePreviousPage} isDisabled={currentPage === 1}>
          Previous
        </Button>
        <Text>Page {currentPage} of {totalPages}</Text>
        <Button onClick={handleNextPage} isDisabled={currentPage === totalPages}>
          Next
        </Button>
      </HStack>
    </Box>
  );
};

export default StudentsList;

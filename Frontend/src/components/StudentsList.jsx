import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Thead, Tbody, Tr, Th, Td, IconButton, useToast, Box, Button, HStack, Text, Input } from '@chakra-ui/react';
import { EditIcon, DeleteIcon, ArrowUpDownIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

const StudentsList = () => {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortField, setSortField] = useState('firstName');
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchName, setSearchName] = useState('');
  const [searchId, setSearchId] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents(currentPage, sortField, sortOrder, searchName, searchId);
  }, [currentPage, sortField, sortOrder, searchName, searchId]);

  const fetchStudents = async (page, sortField, sortOrder, searchName, searchId) => {
    try {
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

      if (response.data.students) {
        setStudents(response.data.students);
        setTotalPages(response.data.totalPages);
      } else {
        console.error('Invalid data format:', response.data);
        toast({
          title: 'Error fetching students. Invalid data format.',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error fetching students:', error);
      toast({
        title: 'Error fetching students.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleDeleteStudent = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/students/${id}`);
      setStudents(students.filter(student => student._id !== id));
      toast({
        title: 'Student deleted.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error deleting student:', error);
      toast({
        title: 'Error deleting student.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(order);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSearchNameChange = (e) => {
    setSearchName(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleSearchIdChange = (e) => {
    setSearchId(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  return (
    <Box overflowX="auto" p={4}>
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
      <Table variant="striped" colorScheme="teal" mt={5}>
        <Thead>
          <Tr>
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
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {students.map((student) => (
            <Tr key={student._id}>
              <Td>{student._id}</Td>
              <Td>{student.firstName}</Td>
              <Td>{student.lastName}</Td>
              <Td>{student.age}</Td>
              <Td>{student.major}</Td>
              <Td>
                <IconButton icon={<EditIcon />} mr={2} onClick={() => navigate(`/edit/${student._id}`)} />
                <IconButton icon={<DeleteIcon />} onClick={() => handleDeleteStudent(student._id)} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
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

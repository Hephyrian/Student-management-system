import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Box, Flex, Heading, Button } from '@chakra-ui/react';
import StudentsList from './components/StudentsList';
import AddStudent from './components/AddStudent';
import EditStudent from './components/EditStudent';

// Main application component
function App() {
  return (
    // Router component to handle navigation
    <Router>
      {/* Flex container to hold the entire layout with a vertical column direction */}
      <Flex direction="column" minHeight="100vh" width="100vw" overflowX="hidden">
        
        {/* Header section with padding, background color, and text color */}
        <Box p={5} bg="purple.600" color="white" width="100%">
          {/* Flex container for aligning content within the header */}
          <Flex justify="space-between" align="center">
            {/* Heading that acts as a link to the home page */}
            <Heading as={Link} to="/">Student Management</Heading>
            {/* Flex container for holding the 'Add Student' button */}
            <Flex>
              {/* Button to navigate to the 'Add Student' page */}
              <Button as={Link} to="/add" colorScheme="purple">Add Student</Button>
            </Flex>
          </Flex>
        </Box>
        
        {/* Main content section with center alignment */}
        <Flex justify="center" align="center" flex="1" p={5} width="100%">
          {/* Box to constrain the width of the content */}
          <Box width="100%" maxWidth="100%">
            {/* Routes to define different paths and their corresponding components */}
            <Routes>
              {/* Route for the home page displaying the list of students */}
              <Route path="/" element={<StudentsList />} />
              {/* Route for the 'Add Student' page */}
              <Route path="/add" element={<AddStudent />} />
              {/* Route for the 'Edit Student' page, using a dynamic parameter for the student ID */}
              <Route path="/edit/:id" element={<EditStudent />} />
            </Routes>
          </Box>
        </Flex>
        
        {/* Footer section with padding, background color, margin-top to push it to the bottom, and text alignment */}
        <Box as="footer" py={4} bg="gray.100" mt="auto" textAlign="center" width="100%">
          <p>&copy; 2024 Hemaka Mario. All rights reserved.</p>
        </Box>
      </Flex>
    </Router>
  );
}

// Exporting the main application component
export default App;

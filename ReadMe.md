# Student Management System

A simple Student Management System built with React, Chakra UI, Node.js, and Express. This application allows you to add, edit, and manage students' information.

## Technologies Used

- **Frontend**:
  - React
  - Chakra UI
  - Axios

- **Backend**:
  - Node.js
  - Express
  - MongoDB (Mongoose)

## Installation

### Prerequisites

- Node.js and npm installed on your machine
- MongoDB installed and running

### Backend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/student-management-system.git
   cd student-management-system
   ```

2. Navigate to the backend directory:

   ```bash
   cd backend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the `backend` directory and add your MongoDB connection string:

   ```env
   MONGO_URI=your_mongodb_connection_string
   ```

5. Start the backend server:

   ```bash
   npm start
   ```

   The backend server will run on `http://localhost:3000`.

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd ../frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the frontend server:

   ```bash
   npm start
   ```

   The frontend server will run on `http://localhost:3001`.

## Project Structure

```bash
student-management-system/
├── backend/
│   ├── models/
│   │   └── Student.js
│   ├── routes/
│   │   └── students.js
│   ├── .env
│   ├── server.js
│   └── package.json
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── AddStudent.jsx
    │   │   ├── EditStudent.jsx
    │   │   └── StudentsList.jsx
    │   ├── App.js
    │   ├── index.js
    │   └── package.json
```

## Usage

### Adding a Student

1. Navigate to the "Add Student" page from the home page.
2. Fill in the student's details and click "Add Student".
3. The student will be added to the database, and you will be redirected to the home page.

### Editing a Student

1. From the home page, click the "Edit" button next to the student you wish to edit.
2. Update the student's details and click "Save Changes".
3. The student's information will be updated in the database, and you will be redirected to the home page.

### Viewing Students

1. The home page displays a list of all students.
2. You can sort the list by clicking on the column headers.
3. Use the search functionality to find students by name or ID.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

```
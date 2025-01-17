import express from 'express';
import cors from 'cors';  // Make sure you're importing 'cors' correctly
import router from './routes/auth.js';
import departmentRouter from './routes/department.js'
import connectToDB from './db/db.js';

const app = express();

// Make sure to call the cors middleware function
app.use(cors());

// Parse incoming requests with JSON payloads
app.use(express.json());

// Use the correct route for authentication
app.use('/api/auth', router);
app.use('/api/department', departmentRouter)
app.use('/department/list', departmentRouter)
app.use('/department/delete', departmentRouter)
app.use('/department/update:id', departmentRouter)

// Connect to the database and then start the server
const startServer = async () => {
  try {
    await connectToDB(); // Ensure the database connection is successful
    const PORT = process.env.PORT || 3000; // Use 3000 if PORT is not defined
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};

startServer();

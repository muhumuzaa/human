import express from 'express';
import cors from 'cors';  // Make sure you're importing 'cors' correctly
import router from './routes/auth.js';
import connectToDB from './db/db.js';
import departmentRouter from './routes/department.js'
import employeeRouter from './routes/employee.js'
import salaryRouter from './routes/salary.js'
import leaveRouter from './routes/leave.js'
import SummaryRouter from './routes/summary.js'
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();
const app = express();

// Make sure to call the cors middleware function
app.use(cors());

// Parse incoming requests with JSON payloads
app.use(express.json());

// Serve the built React files from the 'dist' folder - for azure deployment
app.use(express.static(path.join(process.cwd(), 'dist')));


// If you're using React Router with client-side routing,
// serve index.html for unmatched routes:
app.get('*', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
});

//for file uploads in employee form. To serve uploaded files from the "uploads" directory
app.use("/uploads", express.static("uploads"));

// Use the correct route for authentication
//For department
app.use('/api/auth', router);
app.use('/api/department', departmentRouter)


//For employees
app.use('/api/employee', employeeRouter)

//salary
app.use('/api/salary', salaryRouter )

//leaves
app.use('/api/leaves', leaveRouter)

app.use('/api/summary', SummaryRouter)

//production script
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Connect to the database and then start the server
const startServer = async () => {
  try {
    await connectToDB(); // Ensure the database connection is successful
    const PORT = process.env.PORT || 3000; // Use 8080 if PORT is not defined
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};

startServer();

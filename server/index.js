import path from 'path';
import express from 'express';
import cors from 'cors';

const __dirname = path.resolve();
const app = express();

// Your existing API routes and middleware
app.use(cors());
app.use(express.json());

// Serve static files from React app
app.use(express.static('../frontend/dist'));

// Handle all other routes by serving React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
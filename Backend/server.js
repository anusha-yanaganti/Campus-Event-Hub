// Import required modules
const {MongoClient} = require('mongodb');
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./APIs/routes/userRoutes'); // Update path to userRoutes
//const profileRoutes = require('./APIs/routes/profileRoutes');

// Load environment variables from the .env file
dotenv.config();

// Middleware setup
app.use(cors());
app.use(express.json());
let mClient=new MongoClient("mongodb+srv://Ansha:Ansha329@fs-pro1.aza1b.mongodb.net/?retryWrites=true&w=majority&appName=FS-Pro1");

// Use userRoutes for all user-related routes
app.use('/api/users', userRoutes);

//app.use('/api/profile', profileRoutes);  // For profile operations

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
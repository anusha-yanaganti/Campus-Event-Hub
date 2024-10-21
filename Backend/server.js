// Import required modules
const {MongoClient} = require('mongodb');
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./APIs/routes/userRoutes'); // Update path to userRoutes
const eventRoutes = require('./APIs/routes/eventRoutes'); // Event routes

// Import middlewares
const { authenticateUser} = require('./APIs/middleware/authMiddleware'); // Import from your middleware file

// Load environment variables from the .env file
dotenv.config();

// Middleware setup
app.use(cors());
app.use(express.json());

app.use(bodyParser.json()); // Parse incoming JSON requests
let mClient=new MongoClient("mongodb+srv://Ansha:Ansha329@fs-pro1.aza1b.mongodb.net/?retryWrites=true&w=majority&appName=FS-Pro1");


// // Use userRoutes for all user-related routes
// app.use('/api/users', userRoutes);


// // Use eventRoutes for event-related routes, applying the MongoDB connection middleware and authentication middleware
// app.use('/api/events', eventRoutes);

// // Start the server
// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


// Connect to MongoDB once and pass the client to routes
mClient.connect().then(() => {
  console.log('Connected to MongoDB');

  // Use routes
  app.use('/api/users', userRoutes);
  app.use('/api/events', (req, res, next) => {
      req.dbClient = mClient;  // Pass the connected client to the request
      next();
  }, eventRoutes);

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});
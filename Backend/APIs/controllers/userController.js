
const { MongoClient, ObjectId } = require('mongodb'); // Ensure ObjectId is imported
const bcrypt = require('bcrypt');  // For hashing passwords
const jwt = require('jsonwebtoken');  // For generating tokens
// const { ObjectId } = require('mongodb').ObjectId;


// MongoDB connection setup
const uri = "mongodb+srv://Ansha:Ansha329@fs-pro1.aza1b.mongodb.net/campus-event-hub?retryWrites=true&w=majority&appName=FS-Pro1"; // Use the connection string from .env
const client = new MongoClient(uri);
const dbName = process.env.DB_NAME; // Define database name in your .env file

// Signup controller
const signupUser = async (req, res) => {
  const { username, email, password, confirmPassword, mobileNumber } = req.body; // Get user data from request body

  try {
    // Basic validation
    if (!username || !email || !password || !confirmPassword || !mobileNumber) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Determine the role based on email domain
    let role;
    if (email.endsWith('@pvpsit.ac.in')) {
      role = 'student';
    } else if (email.endsWith('@pvpsiddhartha.ac.in')) {
      role = 'admin';
    } else {
      return res.status(400).json({ message: 'Invalid email domain' });
    }

    // Connect to MongoDB
    await client.connect();
    const db = client.db(dbName);
    const usersCollection = db.collection('users');

    // Check if the email already exists
    const userExists = await usersCollection.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const newUser = {
      username,
      email,
      password: hashedPassword,
      mobileNumber,  // Add mobile number to the database
      role // Automatically set based on the domain
    };
    await usersCollection.insertOne(newUser);

    // Send a response
    res.status(201).json({ message: 'User registered successfully' });

  } catch (err) {
    console.error('Error during signup:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    await client.close();
  }
};



// Login controller
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Connect to MongoDB
    await client.connect();
    const db = client.db(dbName);
    const usersCollection = db.collection('users');

    // Check if the user exists
    const user = await usersCollection.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send the token back to the client
    res.status(200).json({ message: 'Login successful', token });

  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    await client.close();
  }
};


const getUserById = async (req, res) => {
  try {
    await client.connect();
    const database = client.db(dbName);
    const usersCollection = database.collection('users');

    const userId = new ObjectId(req.user.id); // Ensure req.user is populated correctly
    const user = await usersCollection.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      username: user.username,
      email: user.email,
      mobileNumber: user.mobileNumber,
    });
  } catch (error) {
    console.error('Error fetching user details:', error); // Log the error for debugging
    res.status(500).json({ message: 'Server error', error: error.message }); // Return error details
  } finally {
    await client.close();
  }
};


module.exports = {
  signupUser,
  loginUser,
  getUserById,
};


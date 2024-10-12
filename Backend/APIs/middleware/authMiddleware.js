const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware to verify JWT token and authenticate the user
const authenticateUser = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  
  if (!authHeader) {
    return res.status(403).json({ message: 'No token provided' });
  }
  
  const token = authHeader.split(' ')[1];  // "Bearer tokenString"

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized or invalid token' });
    }

    // Attach the user information (decoded from JWT) to the request object for further use
    req.user = decoded;  // Save the entire decoded JWT payload, not just userId
    next();
  });
};

module.exports = authenticateUser;

const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env

async function testConnection() {
  const client = new MongoClient(process.env.MONGO_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  } finally {
    await client.close();
  }
}

testConnection();

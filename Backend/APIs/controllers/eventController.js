const { MongoClient, ObjectId } = require('mongodb');

// MongoDB connection setup
const uri = "mongodb+srv://Ansha:Ansha329@fs-pro1.aza1b.mongodb.net/campus-event-hub?retryWrites=true&w=majority&appName=FS-Pro1"; // Use the connection string from .env
const client = new MongoClient(uri);
const dbName = process.env.DB_NAME; // Define the database name in your .env file
let db;

// Function to connect to MongoDB
async function connectToDB() {
  if (!db) {
    try {
      await client.connect();
      db = client.db(dbName); // Initialize the DB instance
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      throw error; // If connection fails, throw error
    }
  }
  return db;
}

// Create Event
const createEvent = async (req, res) => {
  try {
    const {
      eventTitle,
      startTime,
      endTime,
      date,
      venue,
      description,
      participation,
      teamSizeMin,
      teamSizeMax,
      registrationLink,
      organiser1,
      organiser2,
    } = req.body;

    // Connect to MongoDB
    const db = await connectToDB();
    const eventsCollection = db.collection('events');

    const newEvent = {
      eventTitle,
      startTime,
      endTime,
      date,
      venue,
      description,
      participation,
      teamSizeMin,
      teamSizeMax,
      registrationLink,
      organiser1,
      organiser2,
    };

    const result = await eventsCollection.insertOne(newEvent);
    res.status(201).json({ message: 'Event created successfully', eventId: result.insertedId });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Fetch All Events - Sorted in Chronological Order
const getAllEvents = async (req, res) => {
  try {
    const db = await connectToDB(); // Ensure DB connection
    const events = await db.collection('events')
      .find({})
      .sort({ date: 1 }) // Sort events in chronological order (ascending by date)
      .toArray(); // Convert Mongo cursor to array

    res.status(200).json(events); // Send back the list of events
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Failed to fetch events.' });
  }
};

// Get Event by ID
const getEventById = async (req, res) => {
  const { eventId } = req.params; // Get the eventId from request parameters

  try {
    const db = await connectToDB(); // Connect to MongoDB
    const event = await db.collection('events').findOne({ _id: new ObjectId(eventId) }); // Find the event by its ObjectId

    if (event) {
      res.status(200).json(event); // Send back the event details
    } else {
      res.status(404).json({ message: 'Event not found.' }); // Event not found
    }
  } catch (error) {
    console.error('Error fetching event by ID:', error);
    res.status(500).json({ message: 'Failed to fetch event.' }); // Internal server error
  }
};
// Edit Event by ID
const editEventById = async (req, res) => {
    const { eventId } = req.params;
    let updatedEventData = req.body;

    try {
        // Ensure _id is not included in the update data
        if (updatedEventData._id) {
            delete updatedEventData._id;
        }

        const db = await connectToDB(); // Ensure DB connection
        const result = await db.collection('events').updateOne(
            { _id: new ObjectId(eventId) }, // Find the event by its ObjectId
            { $set: updatedEventData } // Update event data
        );

        if (result.modifiedCount > 0) {
            res.status(200).json({ message: 'Event updated successfully.' });
        } else {
            res.status(404).json({ message: 'Event not found.' });
        }
    } catch (error) {
        console.error('Error updating event:', error);
        res.status(500).json({ message: 'Failed to update event.' });
    }
};

// Delete Event by ID
const deleteEventById = async (req, res) => {
  const { eventId } = req.params;

  try {
    const db = await connectToDB(); // Ensure DB connection
    const result = await db.collection('events').deleteOne({ _id: new ObjectId(eventId) });

    if (result.deletedCount > 0) {
      res.status(200).json({ message: 'Event deleted successfully.' });
    } else {
      res.status(404).json({ message: 'Event not found.' });
    }
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ message: 'Failed to delete event.' });
  }
};







//student db



module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  editEventById,
  deleteEventById
};

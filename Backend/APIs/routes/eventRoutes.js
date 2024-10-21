const express = require('express');
const router = express.Router();

const { createEvent, getAllEvents, getEventById, editEventById, deleteEventById } = require('../controllers/eventController');

const authenticateUser = require('../middleware/authMiddleware'); // Import middleware
// Route to create an event
router.post('/',authenticateUser, createEvent);

// Fetch all events
router.get('/',  getAllEvents);

// Route to fetch an event by ID
router.get('/:eventId', getEventById);

// Edit event by ID
router.put('/:eventId',authenticateUser, editEventById);

// Delete event by ID
router.delete('/:eventId', authenticateUser, deleteEventById);



module.exports = router;

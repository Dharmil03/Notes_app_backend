const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 100, // limit for each window for user
  message: 'Too many requests from this IP, please try again later'
});

const throttler = slowDown({
  windowMs: 30 * 1000, // 30 seconds
  delayAfter: 5, //for delaying 
  delayMs: 500, 
});

app.use(throttler);
app.use(limiter);


// Middleware
app.use(express.json());

// MongoDB Connection
require("./config/database").connect();

// Routes for signup and login
const notesRoutes = require('./routes/userRoute');
app.use('/api/v1', notesRoutes);

// routes for notes information
const student = require("./controllers/notes");
app.use('/api/v1/auth', student);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

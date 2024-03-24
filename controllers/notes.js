const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const notes = require("../model/notes");
const User = require("../model/user");


// Middleware which checks user from token
const auth = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Authorization token missing' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Invalid token' });
  }
};


// Create a new note
router.post('/notes', auth, async (req, res) => {
  try {
    const { title, content } = req.body;
    const createdBy = req.user.id;
    const note = await notes.create({ title, content, createdBy });
    res.status(201).json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Get all notes for the authenticated user
router.get('/getnotes', auth, async (req, res) => {
  try {
    const note = await notes.find({ createdBy: req.user.id });
    res.json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Get a note by ID for the authenticated user
router.get('/checknotes/:id', auth, async (req, res) => {
  try {
    const note = await notes.findOne({ _id: req.params.id, createdBy: req.user.id });
    if (!note) {
      return res.status(404).json({ 
        message: 'Note not found' 
      });
    }
    res.json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({
       message: 'Server error' 
      });
  }
});



// Update a note by ID for the authenticated user
router.put('/notes/:id', auth, async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = await notes.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.id }, 
      { title, content },
      { new: true }
    );
    if (!note) {
      return res.status(404).json({ 
        message: 'Note not found' 
      });
    }
    res.json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({
       message: 'Server error' 
      });
  }
});




// Delete a note by ID for the authenticated user
router.delete('/delnotes/:id', auth, async (req, res) => {
  try {
    const note = await notes.findOneAndDelete({ _id: req.params.id, createdBy: req.user.id });
    if (!note) {
      return res.status(404).json({ 
        message: 'Note not found' 
      });
    }
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({
       message: 'Server error' 
      });
  }
});



// Share a note with another user for the authenticated user
router.post('/notes/:id/share', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const note = await notes.findOne({ _id: id, createdBy: req.user.id });
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    note.sharedWith.push(userId);
    await note.save();
    res.json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Search for notes based on keywords for the authenticated user
router.get('/search', auth, async (req, res) => {
  try {
    const { q } = req.body;
    const notes = await notes.find({ $text: { $search: q }, createdBy: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

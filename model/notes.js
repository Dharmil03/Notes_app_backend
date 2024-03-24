const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title:{
     type: String, 
     required: true 
   },
  content:{
     type: String,
     required: true 
    },
  createdBy:{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
    },
  createdAt:{ 
    type: Date, 
    default: Date.now 
   },
  sharedWith: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model("note",noteSchema);

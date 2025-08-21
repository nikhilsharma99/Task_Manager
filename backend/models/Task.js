const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  assignedTo: {
    type: String, // later this could be a user ID
  },
  status: {
    type: String,
    enum: ['pending', 'in progress', 'completed'],
    default: 'pending',
  },
  deadline: {
    type: Date,
  },
}, { timestamps: true });

const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;

require('reflect-metadata');
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes'); 
const commentRoutes=require('./routes/commentRoutes');
const cors = require("cors");
const app = express();
app.use(cors({
  origin: "http://localhost:5173" // or "*" for all origins (not recommended for production)
}));
app.use(express.json());
// Routes
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes); 
app.use('/api/tasks/:id/comments', commentRoutes);
module.exports = app;
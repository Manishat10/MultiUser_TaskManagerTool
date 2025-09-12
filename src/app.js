const express = require('express');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes'); 
const commentRoutes=require('./routes/commentRoutes');
const app = express();
app.use(express.json());
// Routes
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes); 
app.use('/api/tasks/:id/comments', commentRoutes);
module.exports = app;
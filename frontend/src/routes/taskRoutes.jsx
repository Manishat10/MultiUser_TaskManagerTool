import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TaskList from '../components/task/TaskList';
import ProtectedRoute from './ProtectedRoute'; 

const TaskRoutes = () => (
  <Routes>
    <Route element={<ProtectedRoute />}>
      <Route path="/" element={<TaskList />} />
    </Route>
  </Routes>
);

export default TaskRoutes;
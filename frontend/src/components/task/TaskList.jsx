// components/task/TaskList.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasksThunk } from "../../features/taskSlice";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";
import Button from "../Button";
import FilterBar from "../FilterBar"; 

const TaskList = () => {
    const dispatch = useDispatch();
    const { tasks, loading, error } = useSelector((state) => state.tasks);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        dispatch(fetchTasksThunk());
    }, [dispatch]);

    return (
        <div className="bg-gray-50 min-h-screen py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <header className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-extrabold text-blue-800">Your Tasks</h2>
                    <Button
                        onClick={() => setShowForm(true)}
                        className="bg-blue-600 hover:bg-blue-700 font-bold"
                        text="Add New Task"
                    />
                </header>
                
                <FilterBar /> 

                {loading && <p className="text-gray-500 text-center text-lg">Loading tasks...</p>}
                {error && <p className="text-red-600 text-center text-lg">Error: {error}</p>}
                
                {!loading && tasks.length === 0 && (
                    <p className="text-gray-500 text-center text-lg mt-8">No tasks found. Click "Add New Task" to get started.</p>
                )}

                {!loading && tasks.length > 0 && (
                    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {tasks.map((task) => (
                            <TaskItem key={task.id} task={task} />
                        ))}
                    </div>
                )}
                
                {showForm && <TaskForm onClose={() => setShowForm(false)} />}
            </div>
        </div>
    );
};
export default TaskList;
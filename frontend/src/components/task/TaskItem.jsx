import{ useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTaskThunk } from "../../features/taskSlice";
import TaskForm from "./TaskForm";
import Button from "../Button";
import CommentModal from "./comment/Commentmodel"; 

const TaskItem = ({ task }) => {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [showCommentModal, setShowCommentModal] = useState(false);
    if (!task || !task.id) return null;

    const handleDelete = () => {
      if (window.confirm("Are you sure you want to delete this task?")) {
        dispatch(deleteTaskThunk(task.id));
      }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'done':
                return 'bg-green-500';
            case 'in_progress':
                return 'bg-yellow-500';
            case 'pending':
                return 'bg-red-500';
            default:
                return 'bg-gray-500';
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border-2 border-blue-100">
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{task.title}</h3>
                    <div className="flex space-x-2">
                        <Button
                            onClick={() => setIsEditing(true)}
                            className="bg-blue-500 hover:bg-blue-600 text-white p-2 text-sm rounded-lg"
                            text="Edit"
                        />
                        <Button
                            onClick={handleDelete}
                            className="bg-red-500 hover:bg-red-600 text-white p-2 text-sm rounded-lg"
                            text="Delete"
                        />
                    </div>
                </div>
                <p className="text-gray-600 text-sm mb-2">{task.description}</p>
                
                {task.assigned_to && (
                    <p className="text-gray-500 text-xs mb-4">
                        Assigned to: {task.assigned_to.name}
                    </p>
                )}

                <div className="flex justify-between items-center text-sm">
                    <span className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${getStatusColor(task.status)}`}>
                        {task.status.replace('_', ' ')}
                    </span>
                    <p className="text-gray-500">
                        Due: {new Date(task.due_date).toLocaleDateString()}
                    </p>
                </div>
                
                <div className="mt-4 border-t pt-4 border-gray-200">
                    <Button
                        onClick={() => setShowCommentModal(true)}
                        className="w-full text-center bg-blue-100 hover:bg-blue-200 text-white font-semibold py-2 px-4 rounded-lg"
                        text="Show Comments"
                    />
                </div>
            </div>
            
            {isEditing && <TaskForm task={task} onClose={() => setIsEditing(false)} />}
            {showCommentModal && (
                <CommentModal
                    task={task}
                    onClose={() => setShowCommentModal(false)}
                />
            )}
        </div>
    );
};
export default TaskItem;
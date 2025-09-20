import React from 'react';
import CommentSection from './CommentSection';

const CommentModal = ({ task, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-xl">
                <div className="flex justify-between items-center mb-4 pb-4">
                    <h3 className="text-xl font-bold text-gray-800">{task.title} Comments</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl font-bold leading-none">&times;</button>
                </div>
                <CommentSection taskId={task.id} />
            </div>
        </div>
    );
};
export default CommentModal;
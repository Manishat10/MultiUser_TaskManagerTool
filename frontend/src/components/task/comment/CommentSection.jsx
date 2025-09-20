import React, {useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputForm from "../../InputForm";
import {
  addCommentThunk,
  fetchCommentsThunk,
} from "../../../features/commentSlice";
import Button from "../../Button";

const CommentSection = ({ taskId }) => {
    const dispatch = useDispatch();
    const { comments, loading, error } = useSelector(state => ({
        comments: state.comments.comments[taskId] || [],
        loading: state.comments.loading,
        error: state.comments.error
    }));
    const [commentText, setCommentText] = useState('');

    useEffect(() => {
        if (taskId) {
            dispatch(fetchCommentsThunk(taskId));
        }
    }, [dispatch, taskId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (commentText.trim()) {
            dispatch(addCommentThunk({ taskId, text: commentText }));
            setCommentText('');
        }
    };

    return (
        <div className="mt-4 border-t pt-4">
            <h4 className="font-semibold text-lg mb-2">Comments</h4>
            {loading && <p>Loading comments...</p>}
            {error && <p className="text-red-600">Error: {error}</p>}
            
            <div className="space-y-2 mb-4">
                {!loading && comments.length > 0 ? (
                    comments.map(comment => (
                        <div key={comment.id} className="p-2 bg-gray-100 rounded">
                            <p className="text-sm">{comment.text}</p>
                            <p className="text-xs text-gray-500 mt-1">
                                by {comment.user ? comment.user.name : 'Unknown User'}
                            </p>
                        </div>
                    ))
                ) : (
                    !loading && (
                        <div className="flex flex-col items-center justify-center p-4 border-dashed border-2 border-gray-300 rounded">
                            <p className="text-sm text-gray-500 mb-2">No comments yet.</p>
                        </div>
                    )
                )}
            </div>

            <form onSubmit={handleSubmit} className="flex space-x-2 items-center">
                <div className="flex-1">
                    <InputForm
                        type="text"
                        name="commentText"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Add a comment..."
                        required
                    />
                </div>
                <Button type="submit" text="Add Comment" className="h-full px-4 py-2 bg-blue-600 hover:bg-blue-700" />
            </form>
        </div>
    );
};

export default CommentSection;
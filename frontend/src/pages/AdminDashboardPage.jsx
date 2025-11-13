import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsersThunk } from "../features/userSlice";
import { fetchAllTasksThunk } from "../features/adminSlice";
import { fetchAllCommentsThunk } from "../features/adminSlice";
import { logout } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

const AdminDashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { allUsers, loading: usersLoading } = useSelector((state) => state.users);
  const { tasks, comments, loading: adminLoading } = useSelector((state) => state.admin);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    // Check if user is admin
    if (!user || !user.isAdmin) {
      navigate("/admin/login");
      return;
    }
    
    // Fetch all data for admin
    dispatch(fetchAllUsersThunk());
    dispatch(fetchAllTasksThunk());
    dispatch(fetchAllCommentsThunk());
  }, [dispatch, user, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/admin/login");
  };

  if (!user || !user.isAdmin) {
    return <div>Access Denied. Redirecting...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-100 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Users</h2>
          <p className="text-3xl font-bold">{usersLoading ? "..." : allUsers.length}</p>
        </div>
        <div className="bg-green-100 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Tasks</h2>
          <p className="text-3xl font-bold">{adminLoading ? "..." : tasks.length}</p>
        </div>
        <div className="bg-yellow-100 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Comments</h2>
          <p className="text-3xl font-bold">{adminLoading ? "..." : comments.length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Users Table */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">All Users</h2>
          {usersLoading ? (
            <p>Loading users...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">ID</th>
                    <th className="py-2 px-4 border-b">Name</th>
                    <th className="py-2 px-4 border-b">Email</th>
                    <th className="py-2 px-4 border-b">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {allUsers.map((user) => (
                    <tr key={user.id}>
                      <td className="py-2 px-4 border-b">{user.id}</td>
                      <td className="py-2 px-4 border-b">{user.name}</td>
                      <td className="py-2 px-4 border-b">{user.email}</td>
                      <td className="py-2 px-4 border-b">
                        {user.isAdmin ? (
                          <span className="bg-red-500 text-white px-2 py-1 rounded text-sm">Admin</span>
                        ) : (
                          <span className="bg-gray-500 text-white px-2 py-1 rounded text-sm">User</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Tasks Table */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">All Tasks</h2>
          {adminLoading ? (
            <p>Loading tasks...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">ID</th>
                    <th className="py-2 px-4 border-b">Title</th>
                    <th className="py-2 px-4 border-b">Status</th>
                    <th className="py-2 px-4 border-b">Created By</th>
                    <th className="py-2 px-4 border-b">Assigned To</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => (
                    <tr key={task.id}>
                      <td className="py-2 px-4 border-b">{task.id}</td>
                      <td className="py-2 px-4 border-b">{task.title}</td>
                      <td className="py-2 px-4 border-b">
                        <span className="px-2 py-1 rounded text-sm bg-blue-100">
                          {task.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-2 px-4 border-b">
                        {task.created_by ? task.created_by.name : 'Unknown'}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {task.assigned_to ? task.assigned_to.name : 'Unassigned'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Comments Table */}
        <div className="bg-white p-6 rounded-lg shadow lg:col-span-2">
          <h2 className="text-2xl font-bold mb-4">All Comments</h2>
          {adminLoading ? (
            <p>Loading comments...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">ID</th>
                    <th className="py-2 px-4 border-b">Comment</th>
                    <th className="py-2 px-4 border-b">User</th>
                    <th className="py-2 px-4 border-b">Task</th>
                    <th className="py-2 px-4 border-b">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {comments.map((comment) => (
                    <tr key={comment.id}>
                      <td className="py-2 px-4 border-b">{comment.id}</td>
                      <td className="py-2 px-4 border-b">{comment.text}</td>
                      <td className="py-2 px-4 border-b">
                        {comment.user ? comment.user.name : 'Unknown'}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {comment.task ? comment.task.title : 'Unknown'}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {new Date(comment.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
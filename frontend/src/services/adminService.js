const API_BASE_URL = "http://localhost:5000/api";

// Function to fetch all tasks (admin only)
export async function fetchAllTasks() {
  try {
    const response = await fetch(`${API_BASE_URL}/users/admin/tasks`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch tasks");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

// Function to fetch all comments (admin only)
export async function fetchAllComments() {
  try {
    const response = await fetch(`${API_BASE_URL}/users/admin/comments`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch comments");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
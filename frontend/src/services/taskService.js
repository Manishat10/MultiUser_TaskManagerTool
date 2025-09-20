const API_BASE_URL = "http://localhost:5000/api"; 

export async function createTask(taskData) {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "failed to create task");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
export async function getTask(taskId) {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "failed to fetch task");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
export async function deleteTask(taskId) {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "failed to delete task");
    }
    return taskId;
  } catch (error) {
    throw error;
  }
}
export async function updateTask(taskId, taskData) {
  try {
    
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "failed to update task");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchTasks(filters = {}) {
  try {
    const queryString = Object.keys(filters)
      .map(key => `${key}=${encodeURIComponent(filters[key])}`)
      .join('&');
      
    const url = `${API_BASE_URL}/tasks?${queryString}`;
    
    const response = await fetch(url, {
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
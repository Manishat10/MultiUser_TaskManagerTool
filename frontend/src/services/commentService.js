import { API_BASE_URL } from "./authService";
export async function fetchComments(taskId) {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}/comments`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "failed to fetch comments");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
export async function addComment(taskId, text) {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}/comments`, {
      method: "POST",
      credentials: "include",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({text}),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message||"failed to add comment");
    }
    const data= await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

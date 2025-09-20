const API_BASE_URL = "http://localhost:5000/api";

export async function fetchAllUsers() {
  try {
    const response = await fetch(`${API_BASE_URL}/users/all`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
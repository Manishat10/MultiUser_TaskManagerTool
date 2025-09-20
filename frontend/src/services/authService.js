
export const API_BASE_URL = "http://localhost:5000/api";

export async function checkAuth() {
  try {
    const response = await fetch(`${API_BASE_URL}/users/checkAuth`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Not authenticated");
    }
    const data = await response.json();
    return data; 
  } catch (error) {
    throw error;
  }
}

export async function loginUser(credentials) {
  try {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function registerUser(userInfo) {
  try {
    const response = await fetch(`${API_BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Registration failed");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function logoutUser() {
  try {
    const response = await fetch(`${API_BASE_URL}/users/logout`, {
      method: "POST",
      credentials: "include",
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Logout failed");
    }
    return true;
  } catch (error) {
    throw error;
  }
}
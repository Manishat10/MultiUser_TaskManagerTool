const API_BASE_URL = "http://localhost:5000/api"; // Replace with your backend URL

export async function loginUser(credentials) {
  try {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: "POST",
      credentials: "include", // Include cookies for session management
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
    return data; // e.g., { message, user }
  } catch (error) {
    throw error;
  }
}

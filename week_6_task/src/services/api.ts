// API service for handling HTTP requests

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const api = {
  // Fetch data using fetch API (returns JSON)
  async getUsers() {
    const response = await fetch(`${API_BASE_URL}/users`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },

  async getPosts() {
    const response = await fetch(`${API_BASE_URL}/posts`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },

  async getTodos() {
    const response = await fetch(`${API_BASE_URL}/todos`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },

  async getUser(id: number) {
    const response = await fetch(`${API_BASE_URL}/users/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },

  // POST request with JSON body
  async createPost(data: { title: string; body: string; userId: number }) {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },

  // Simulate form data submission
  async submitFormData(formData: FormData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Log formData for demonstration
    console.log('FormData received:', formData);
    
    // In real scenario, you would do:
    // const response = await fetch('/api/submit', {
    //   method: 'POST',
    //   body: formData // FormData is automatically sent with multipart/form-data
    // });
    
    return {
      success: true,
      message: 'Form submitted successfully!',
      timestamp: Date.now()
    };
  }
};

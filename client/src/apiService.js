const BASE_URL = "http://localhost:3000";

const apiService = {
  postMsg: async (content) => {
    const message = { content, authorId: true };
    const res = await fetch(`${BASE_URL}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
    return res.json();
  },
  
  getAll: async () => {
    const res = await fetch(`${BASE_URL}/messages`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.json();
  },
};

export default apiService;

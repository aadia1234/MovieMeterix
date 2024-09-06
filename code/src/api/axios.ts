import axios from 'axios';

const api = axios.create({baseURL: "http://localhost:8000/"});

// Add a request interceptor to include the JWT in the Authorization header
api.interceptors.response.use(
    (response) => response,  // If the response is successful, just return it
    async (error) => {
      const originalRequest = error.config;
  
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        await refreshToken();  // Refresh the token
        const newAccessToken = localStorage.getItem('access_token');
        if (newAccessToken) {
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return api(originalRequest);  // Retry the original request with the new token
        }
      }
  
      return Promise.reject(error);
    }
);

  const refreshToken = async () => {
    try {
      const refresh = localStorage.getItem('refresh_token');
      if (refresh) {
        const response = await axios.post('http://localhost:8000/users/auth/refresh/', {
          refresh,
        });
        const { access } = response.data;
        localStorage.setItem('access_token', access);
      }
    } catch (err) {
      console.log('Failed to refresh token:', err);
    }
};

  
export default api
import axios from 'axios';
import ToastMessage from './src/utilities/Toast';


const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use(
  response => {
    if (response.config.method === 'post') {
      ToastMessage({ type: "success", message: 'Created successfully!' });
    } else if (response.config.method === 'put') {
      ToastMessage({ type: "success", message: 'Updated successfully!' });
    } else if (response.config.method === 'delete') {
      ToastMessage({ type: "success", message: 'Deleted successfully!' });
    }
    return response;
  },
  error => {
    if (error.response) {
      if (error.response.status === 403 ) {
        ToastMessage({ type: "error", message: error.message });
      } else if (error.response.status === 400 || error.response.status === 401) {
        const errorMessage = error.message || 'Bad request. Please check your input.';
        ToastMessage({ type: "error", message: errorMessage });
      } else if (error.response.status === 500) {
        ToastMessage({ type: "error", message: 'Server error. Please try again later.' });
      } else if (error.response.status === 404) {
        ToastMessage({ type: "error", message: error.message  });
      } else {
        ToastMessage({ type: "error", message: 'An error occurred. Please try again.' });
      }
    } else {
      ToastMessage({ type: "error", message: 'An error occurred. Please check your connection.' });
    }
    console.error('API call failed:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;

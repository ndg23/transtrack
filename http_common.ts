import axios from 'axios';

// Base server configuration
const SERVER_LINK = `${process.env.APP_URL_}`;
const PORT=3002
// const SERVER_LINK = '38.242.234.253';
const server_centri = `${SERVER_LINK}:8008`;
export const terms = `http://${SERVER_LINK}/terms.html`;
export const data = `http://${SERVER_LINK}/data.html`;
export const centrifugo = `ws://${server_centri}/connection/websocket`;
export const channel = ['transactions'];
export const SERVER = `http://${SERVER_LINK}:${PORT}/api/v1`;



// Create an Axios instance
const apiClient = axios.create({
  baseURL: SERVER,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // You can add any custom headers or configurations here
    // Example: Adding an Authorization token
    // config.headers.Authorization = `Bearer ${token}`;
    console.log(`Making request to ${config.url}`);
    return config;
  },
  (error) => {
    // Handle request errors here
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    // Any status code within the range of 2xx triggers this function
    return response;
  },
  (error) => {
    // Any status codes outside the range of 2xx trigger this function
    console.error('Response error:', error.message);

    // Handle specific error status codes (e.g., 401 Unauthorized, 404 Not Found)
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.error('Unauthorized access - perhaps redirect to login');
          // Add logic to handle unauthorized access, e.g., redirect to login screen
          break;
        case 404:
          console.error('Resource not found');
          // Handle 404 errors, e.g., show a user-friendly message
          break;
        case 400:
          console.error('Resource missing', error);
          // Handle 404 errors, e.g., show a user-friendly message
          break;
        case 500:
          console.error("Error server");
          // Handle 404 errors, e.g., show a user-friendly message
          break;
        default:
          console.error(`Error ${error.response.status}: ${error.response.data}`);
      }
    } else {
      console.error('Network error or server is down', error);
      // Handle network errors, e.g., show a user-friendly message
    }

    return Promise.reject(error);
  }
);

export default apiClient;

import axios from 'axios';

//get token from local storage
let token = localStorage.getItem('token');

//create axios instance
 const ax = axios.create({
    baseURL: 'http://localhost:3000/',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
    }  
})




const refreshAccessToken = async () => {
    try {
        console.log('refreshing token')
        // Make a request to your server to refresh the access token
        const response = await ax.post('/auth/refresh', {
            refreshToken: localStorage.getItem('refreshToken')
        });

        // Extract and return the new access token from the response and update the local storage
        localStorage.setItem('token', response.data.accessToken);
        updateAuthToken();
        return response.data.accessToken;
    } catch (error) {
        // Handle any errors that occur during token refresh
        console.error('Error refreshing access token:', error);
        throw error; // Rethrow the error to be caught by the calling function
    }
};

ax.interceptors.response.use(
    response => response, // If the request is successful, pass the response through
    async error => {

        const originalRequest = error.config;
        
        // Check if the error status is 401 (Unauthorized) indicating the access token has expired
        if (error.response.status === 401 && !originalRequest._retry && error.response.data.message === 'Token expired') {
            originalRequest._retry = true;
            
            try {
                // Refresh the access token
                const accessToken = await refreshAccessToken();
                
                // Update the original request with the new access token
                originalRequest.headers['Authorization'] = accessToken;
                
                // Retry the original request with the new access token
                return ax(originalRequest);
            } catch (error) {
                console.log(error)
                // Handle any errors that occur during token refresh
                return Promise.reject(error);
            }
        }

        // If the error status is not 401 or the original request is already retried, return the error
        return Promise.reject(error);
    }
);

export default ax;

//update axios instance headers with token
export const updateAuthToken = () => {
    token = localStorage.getItem('token');
    ax.defaults.headers.Authorization = token ? `${token}` : null;
  };






import axios from 'axios';

const token = localStorage.getItem('accessToken');

const myRefreshToken = localStorage.getItem('refreshToken');

const refreshToken = async () => {
  try {
    console.log('get new token using refresh token', myRefreshToken);
    // Make a request to refresh the token
    const res = await axios.post('http://localhost:8080/api/v1/auth/refresh-token', {}, {
      headers: { Authorization: `Bearer ${myRefreshToken}`},
    });

    console.log('Response refresh token:', res);

    return res;
  } catch (error) {
    throw new Error('Token refresh failed');
  }
};

const instance = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    Authorization: `Bearer ${token}`, // Replace with your authorization token
  },
});

instance.interceptors.request.use((request) => {
  console.log('instance.interceptors.request.use');
  return request;
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      return refreshToken().then((rs) => {
        const {accessToken} = rs.data;
        localStorage.setItem('accessToken', accessToken);
        const {config} = error.response;
        config.headers = {
          Authorization: `Bearer ${accessToken}`, // Replace with your authorization token
        };
        config.baseURL = 'http://localhost:8080';
        return instance(config);
      });
    }
    if (error.response) {
      return error.response.data;
    }

    return Promise.reject(error);
  }
);

export default instance;

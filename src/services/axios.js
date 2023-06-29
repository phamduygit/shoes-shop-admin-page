import customAxios from 'axios';

const refreshToken = async () => {
  try {
    const myRefreshToken = localStorage.getItem('refreshToken');
    // Make a request to refresh the token
    const res = await customAxios.post(
      'http://localhost:8080/api/v1/auth/refresh-token',
      {},
      {
        headers: { Authorization: `Bearer ${myRefreshToken}` },
      }
    );

    console.log('Response refresh token:', res);

    return res;
  } catch (error) {
    throw new Error('Token refresh failed');
  }
};

const axios = customAxios.create({
  baseURL: 'http://localhost:8080',
});

axios.setToken = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  localStorage.setItem('accessToken', token);
};

axios.interceptors.request.use((request) => request);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      return refreshToken().then((rs) => {
        const { accessToken } = rs.data;
        localStorage.setItem('accessToken', accessToken);
        axios.setToken(accessToken);
        const { config } = error.response;
        config.headers = {
          Authorization: `Bearer ${accessToken}`, // Replace with your authorization token
        };
        config.baseURL = 'http://localhost:8080';
        return axios(config);
      });
    }
    if (error.response) {
      return error.response.data;
    }

    return Promise.reject(error);
  }
);

export default axios;


import customAxios from 'axios';


const BASE_URL_SERVER = 'https://pmdshoesshop.online';

const refreshToken = async () => {
  try {
    const myRefreshToken = localStorage.getItem('refreshToken');
    // Make a request to refresh the token
    if (myRefreshToken == null) return null;
    
    const res = await customAxios.post(
      `${BASE_URL_SERVER}/api/v1/auth/refresh-token`,
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
  baseURL: BASE_URL_SERVER,
});

axios.setToken = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  localStorage.setItem('accessToken', token);
};

axios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    // console.log(accessToken);
    config.headers = {
      Authorization: `Bearer ${accessToken}`, // Replace with your authorization token
    };
    console.log(config.url);
    return config;
  },
  (error) => error
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      return refreshToken()
        .then((rs) => {
          if (rs == null) return null;
          const { accessToken } = rs.data;
          console.log("Refresh success: ", accessToken);
          localStorage.setItem('accessToken', accessToken);
          axios.setToken(accessToken);
          const { config } = error.response;
          config.headers = {
            Authorization: `Bearer ${accessToken}`, // Replace with your authorization token
          };
          config.baseURL = BASE_URL_SERVER;
          return axios(config);
        })
        .catch((err) => {
          console.log("Refresh error: ", err);
          const { config } = error.response;
          const accessToken = localStorage.getItem('accessToken');
            config.headers = {
              Authorization: `Bearer ${accessToken}`, // Replace with your authorization token
            };
            config.baseURL = BASE_URL_SERVER;
          return axios(config);
        });
    }
    console.log(error)
    if (error.response) {
      return error.response.data;
    }

    return Promise.reject(error);
  }
);

export default axios;

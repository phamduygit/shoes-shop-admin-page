import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// @mui
import { Stack, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import axios from '../../../services/axios';


export default function LoginForm() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('admin@gmail.com');

  const [password, setPassword] = useState('123456');

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();
    console.log(email, password);
    // 1. Request login to get accessToke and refreshToken
    try {
      console.log('username', email);
      const response = await axios({
        method: 'post',
        url: '/api/v1/auth/login',
        data: {
          email,
          password,
        },
      });
      console.log(response);
      const accessToken = response?.data?.accessToken;
      const refreshToken = response?.data?.refreshToken;
      const userInfo = response?.data?.user;

      if (userInfo.role !== "ADMIN") {
        return;
      }
      // 2. Save accessToken and refreshToken to localStorage

      localStorage.setItem("accessToken", accessToken);

      localStorage.setItem("refreshToken", refreshToken);

      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      const jwtObject = {
        accessToken,
        refreshToken
      }

      dispatch({
        type: 'JWT',
        payload: jwtObject,
      });

      navigate('/dashboard/app', { replace: false });
      
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Stack spacing={3} mb={3} >
        <TextField  defaultValue={"admin@gmail.com"} name="email" label="Email address" onInput={(e) => setEmail(e.target.value)} />

        <TextField
          name="password"
          label="Password"
          defaultValue={"123456"}
          type={showPassword ? 'text' : 'password'}
          onInput={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
    </>
  );
}

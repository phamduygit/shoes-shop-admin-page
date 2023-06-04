import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';


export default function LoginForm() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();
    console.log(email, password);
    // 1. Request login to get accessToke and refreshToken
    try {
      const response = await axios({
        method: 'post',
        url: 'http://localhost:8080/api/v1/auth/login',
        data: {
          email,
          password,
        },
      });
      console.log(response);
      const accessToken = response?.data?.accessToken;
      const refreshToken = response?.data?.refreshToken;
      // 2. Save accessToken and refreshToken to localStorage

      localStorage.setItem("accessToken", accessToken);

      localStorage.setItem("refreshToken", refreshToken);

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
        <TextField name="email" label="Email address" onInput={(e) => setEmail(e.target.value)} />

        <TextField
          name="password"
          label="Password"
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

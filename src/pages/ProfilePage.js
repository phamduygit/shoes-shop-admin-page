import { Container, Stack, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../services/axios';

export default function ProfilePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.user.object);

  // handleSubmit function will be called when the form is submitted
  const onSubmit = async (data) => {
    console.log(data);
    console.log('On click save');
    dispatch({
      type: 'START_LOADING',
      payload: true,
    });
    try {
      const response = await axios({
        method: 'put',
        url: 'http://localhost:8080/api/v1/user',
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          phoneNumber: data.phoneNumber,
          avatar: data.avatar,
        },
      });
      dispatch({
        type: 'USER_INFO',
        payload: response.data,
      });
    } catch (err) {
      console.log(err);
    }
    dispatch({
      type: 'END_LOADING',
      payload: true,
    });
  };

  const [imageUrl, setImageUrl] = useState(userInfo.avatar != null ? userInfo.avatar : '');

  const inputFile = useRef(null);

  const addFile = () => {
    console.log('Add file');
    inputFile.current.click();
  };

  const addFileCompleted = async (event) => {
    const bodyFormData = new FormData();
    bodyFormData.append('image', event.target.files[0]);
    console.log('Add file complete');
    dispatch({
      type: 'START_LOADING',
      payload: true,
    });
    try {
      const response = await axios({
        method: 'post',
        url: 'http://localhost:8080/uploadImage',
        data: bodyFormData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(response);
      setImageUrl(response.data.url);
    } catch (err) {
      console.log(err);
    }
    dispatch({
      type: 'END_LOADING',
      payload: true,
    });
  };

  return (
    <>
      <Helmet>
        <title> Dashboard: Products | Minimal UI </title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0}>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Profile
          </Typography>
        </Stack>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction="row" mb={3} spacing={5}>
            <TextField
              name="firstName"
              label="First Name"
              defaultValue={userInfo.firstName != null ? userInfo.firstName : ''}
              fullWidth
              {...register('firstName', { required: true })}
              error={!!errors.firstName}
              helperText={errors.firstName && 'This field is required'}
            />
            <TextField
              label="Last Name"
              name="lastName"
              defaultValue={userInfo.lastName != null ? userInfo.lastName : ''}
              fullWidth
              {...register('lastName', { required: true })}
              error={!!errors.lastName}
              helperText={errors.lastName && 'This field is required'}
            />
          </Stack>
          <Stack direction="row" mb={3} spacing={5}>
            <TextField
              name="phoneNumber"
              label="Phone Number"
              defaultValue={userInfo.phoneNumber != null ? userInfo.phoneNumber : ''}
              fullWidth
              {...register('phoneNumber', { required: true })}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber && 'This field is required'}
            />
          </Stack>
          <Stack direction="row" mb={3} spacing={5}>
            <TextField
              name="avatar"
              label="Avatar"
              fullWidth
              value={imageUrl}
              {...register('avatar', { required: true })}
              error={!!errors.avatar}
              helperText={errors.avatar && 'This field is required'}
              onClick={addFile}
            />
            <input type="file" id="file" ref={inputFile} onChange={addFileCompleted} style={{ display: 'none' }} />
          </Stack>
          <LoadingButton fullWidth size="large" type="submit" variant="contained">
            Save
          </LoadingButton>
        </form>
      </Container>
    </>
  );
}

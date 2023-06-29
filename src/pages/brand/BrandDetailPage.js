import { Breadcrumbs, Container, Link, Stack, TextField, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { Helmet } from 'react-helmet-async';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import axios from '../../services/axios';

export default function BrandDetailPage() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [brandName, setBrandName] = useState('');

  const { id } = useParams();

  useEffect(() => {
    dispatch({
      type: 'START_LOADING',
      payload: true,
    });

    const fetchBrandById = async (id) => {
      try {
        const res = await axios.get(`/api/v1/brand-category/${id}`);
        console.log(res);
        setBrandName(res.data.data.name);
        setImageUrl(res.data.data.image);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBrandById(id);

    dispatch({
      type: 'END_LOADING',
      payload: false,
    });
  }, [dispatch, id]);

  // handleSubmit function will be called when the form is submitted
  const onSubmit = async () => {
    console.log('On click save');
    dispatch({
      type: 'START_LOADING',
      payload: true,
    });
    try {
      const response = await axios({
        method: 'put',
        url: `http://localhost:8080/api/v1/brand-category/${id}`,
        data: {
          name: brandName,
          image: imageUrl,
        },
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
    dispatch({
      type: 'END_LOADING',
      payload: true,
    });
  };

  const handleOnClickDelete = async () => {
    dispatch({
      type: 'START_LOADING',
      payload: true,
    });
    try {
      const response = await axios({
        method: 'delete',
        url: `http://localhost:8080/api/v1/brand-category/${id}`,
      });
      if (response != null) {
        navigate('/dashboard/brand', { replace: true });
      }
    } catch (err) {
      console.log(err);
    }
    dispatch({
      type: 'END_LOADING',
      payload: true,
    });
  };

  const [imageUrl, setImageUrl] = useState('');

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

  const handleClickBrand = () => {
    console.log('Do navigate');
    navigate('/dashboard/brand', { replace: true });
  };

  return (
    <>
      <Helmet>
        <title> Dashboard: Products | Minimal UI </title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0}>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" sx={{ mb: 5 }}>
            <Link underline="hover" key="1" color="#000000" onClick={handleClickBrand}>
              <Typography variant="h4">Brand</Typography>
            </Link>
            ,
            <Link underline="hover" key="1" color="#000000">
              <Typography variant="h4">{brandName}</Typography>
            </Link>
            ,
          </Breadcrumbs>
        </Stack>
        <Stack direction="row" mb={3} spacing={5}>
          <TextField
            name="name"
            label="Brand Name"
            fullWidth
            value={brandName}
            onInput={(e) => setBrandName(e.target.value)}
          />
        </Stack>
        <Stack direction="row" mb={3} spacing={5}>
          <TextField name="image" label="Image" fullWidth value={imageUrl} onClick={addFile} />
          <input type="file" id="file" ref={inputFile} onChange={addFileCompleted} style={{ display: 'none' }} />
        </Stack>
        <Stack direction="row" mb={3} spacing={5}>
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            onClick={handleOnClickDelete}
            color="error"
          >
            Delete
          </LoadingButton>
          <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={onSubmit}>
            Update
          </LoadingButton>
        </Stack>
      </Container>
    </>
  );
}

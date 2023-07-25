import { Breadcrumbs, Container, Link, Stack, TextField, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { Helmet } from 'react-helmet-async';
import { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import axios from '../../services/axios';

export default function PromoteDetailPage() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [title, setTitle] = useState('');

  const [description, setDescription] = useState('');

  const [discountValue, setDiscountValue] = useState(0);

  const [quantity, setQuantity] = useState(0);

  const [color, setColor] = useState('');

  const [startDate, setStartDate] = useState(new Date());

  const [endDate, setEndDate] = useState(new Date());

  const { id } = useParams();

  useEffect(() => {
    dispatch({
      type: 'START_LOADING',
      payload: true,
    });

    const fetchBrandById = async (id) => {
      try {
        const res = await axios.get(`/api/v1/promote/${id}`);
        setTitle(res.data.title);
        setDescription(res.data.description);
        setDiscountValue(res.data.discountValue)
        setColor(res.data.color);
        setImageUrl(res.data.coverImage);
        setQuantity(res.data.quantity);
        setStartDate(res.data.startDate);
        setEndDate(res.data.endDate);
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
        url: `/api/v1/promote/${id}`,
        data: {
          title,
          description,
          discountValue,
          color,
          startDate,
          endDate,
          coverImage: imageUrl,
          quantity,
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
        url: `/api/v1/brand-category/${id}`,
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
        url: '/uploadImage',
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

  const handleClickPromote = () => {
    console.log('Do navigate');
    navigate('/dashboard/promote', { replace: true });
  };

  return (
    <>
      <Helmet>
        <title> Dashboard: Products | Minimal UI </title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0}>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" sx={{ mb: 5 }}>
            <Link underline="hover" key="1" color="#000000" onClick={handleClickPromote}>
              <Typography variant="h4">Promote</Typography>
            </Link>
            ,
            <Link underline="hover" key="1" color="#000000">
              <Typography variant="h4">Promote detail</Typography>
            </Link>
            ,
          </Breadcrumbs>
        </Stack>
        <Stack direction="row" mb={3} spacing={5}>
          <TextField
            name="title"
            label="Promote title"
            value={title}
            onInput={(e) => setTitle(e.target.value)}
            fullWidth
          />
          <TextField
            name="discountValue"
            label="Discount value"
            value={discountValue}
            onInput={(e) => setDiscountValue(e.target.value)}
            fullWidth
          />
        </Stack>
        <Stack direction="row" mb={3} spacing={5}>
          <TextField
            name="description"
            label="Description"
            value={description}
            onInput={(e) => setDescription(e.target.value)}
            fullWidth
          />
        </Stack>
        <Stack direction="row" mb={3} spacing={5}>
          <TextField name="color" label="Color" value={color} onInput={(e) => setColor(e.target.value)} fullWidth />
          <TextField
            name="quantity"
            label="Quantity"
            value={quantity}
            onInput={(e) => setQuantity(e.target.value)}
            fullWidth
          />
        </Stack>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack direction="row" justifyContent="space-between" mb={3} spacing={5}>
            <DatePicker
              value={dayjs(startDate)}
              onChange={(newValue) => setStartDate(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
            <DatePicker
              renderInput={(params) => <TextField {...params} fullWidth />}
              value={dayjs(endDate)}
              onChange={(newValue) => setEndDate(newValue)}
            />
          </Stack>
        </LocalizationProvider>

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

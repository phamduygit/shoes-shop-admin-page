import { Breadcrumbs, Container, Link, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import axios from '../../services/axios';

export default function OrderDetailPage() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [productName, setProductName] = useState('');

  const [imageUrl, setImageUrl] = useState('');

  const [size, setSize] = useState(0);

  const [shippingStatus, setShippingStatus] = useState('PREPARE');

  const [price, setPrice] = useState(0);

  const [totalPrice, setTotalPrice] = useState(0);

  const [userId, setUserId] = useState(0);

  const [address, setAddress] = useState('');

  const [quantity, setQuantity] = useState('');

  const { id } = useParams();

  useEffect(() => {
    dispatch({
      type: 'START_LOADING',
      payload: true,
    });

    const fetchBrandById = async (id) => {
      try {
        const res = await axios.get(`/api/v1/order/${id}`);
        console.log(res);
        setProductName(res.data.productName);
        setImageUrl(res.data.imageUrl);
        setSize(res.data.size);
        setQuantity(res.data.quantity);
        setShippingStatus(res.data.shippingStatus);
        setPrice(res.data.price);
        setUserId(res.data.userId);
        setAddress(res.data.address);
        setTotalPrice(res.data.totalPrice);
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
        url: `/api/v1/order/admin/${id}`,
        data: {
          shippingStatus,
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


  const handleOnClickOrder = () => {
    navigate(-1);
  };

  const allShippingStatus = [
    { id: 0, value: 'PREPARE' },
    { id: 1, value: 'IN_DELIVERY' },
    { id: 2, value: 'WAIT_FOR_RECEIVE' },
    { id: 3, value: 'COMPLETE' },
  ];

  const handleSelectStatus = (event) => {
    setShippingStatus(event.target.value);
  };

  return (
    <>
      <Helmet>
        <title> Dashboard: Products | Minimal UI </title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0}>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" sx={{ mb: 5 }}>
            <Link underline="hover" key="1" color="#000000" onClick={handleOnClickOrder}>
              <Typography variant="h4">Order</Typography>
            </Link>
            ,
            <Link underline="hover" key="1" color="#000000">
              <Typography variant="h4">Order detail</Typography>
            </Link>
            ,
          </Breadcrumbs>
        </Stack>
        <Stack direction="row" mb={3} spacing={5}>
          <TextField name="productName" label="Product name" value={productName} disabled fullWidth />
          <TextField name="size" label="Size" value={size} disabled fullWidth />
        </Stack>
        <Stack direction="row" mb={3} spacing={5}>
          <TextField name="imageUrl" label="Image" value={imageUrl} disabled fullWidth />
        </Stack>
        <Stack direction="row" mb={3} spacing={5}>
          <TextField name="userId" label="User ID" value={userId} disabled fullWidth />
          <TextField
            name="shippingStatus"
            label="Shipping Status"
            value={shippingStatus}
            select
            onChange={handleSelectStatus}
            fullWidth
          >
            {allShippingStatus.map((status) => (
              <MenuItem key={status.id} value={status.value}>
                {status.value}
              </MenuItem>
            ))}
          </TextField>
        </Stack>

        <Stack direction="row" mb={3} spacing={5}>
          <TextField name="price" label="Price" value={price} disabled fullWidth />
          <TextField name="quantity" label="Quantity" value={quantity} disabled fullWidth />
        </Stack>

        <Stack direction="row" mb={3} spacing={5}>
          <TextField name="totalPrice" label="Total price" value={totalPrice} disabled fullWidth />
          <TextField name="address" label="Address" value={address} disabled fullWidth />
        </Stack>

        <Stack direction="row" mb={3} spacing={5}>
          
          <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={onSubmit}>
            Update
          </LoadingButton>
        </Stack>
      </Container>
    </>
  );
}

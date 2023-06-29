import { Helmet } from 'react-helmet-async';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
// @mui
import {
  Alert,
  AlertTitle,
  Breadcrumbs,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
  Link,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useNavigate, useParams } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import axios from '../../services/axios';

export default function ProdcutDetailPage() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { id } = useParams();

  const handleClick = () => {
    navigate('/dashboard/products/all', { replace: true });
  };

  const [isShowAlert, setShowAlert] = useState(false);

  const [responseStatus, setResponseState] = useState('');

  const [titleErrorMessage, setTitleErrorMessage] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const [name, setName] = useState('');

  const [price, setPrice] = useState(0);

  const [description, setDescription] = useState('');

  const [sizes, setSizes] = useState('');

  const [colors, setColors] = useState('');

  const [status, setStatus] = useState('NONE');

  const [priceSales, setPriceSales] = useState(0);

  const allStatus = ['NEW', 'SALE', 'NONE'];

  const handleClickUpdate = async () => {
    dispatch({
      type: 'START_LOADING',
      payload: true,
    });
    try {
      const response = await axios({
        method: 'put',
        url: `http://localhost:8080/api/shoes/${id}`,
        data: {
          name,
          price,
          coverImage: imageUrl,
          status,
          priceSales,
          sizes: sizes.split(','),
          colors: colors.split(','),
          description,
        },
      });
      console.log(response);
      setResponseState('success');
      setShowAlert(true);
      setTitleErrorMessage('Product is added successfully');
      setErrorMessage("Let's check it in product page");
    } catch (err) {
      setResponseState('error');
      setShowAlert(true);
      setTitleErrorMessage('Something went wrong');
      setErrorMessage(Object.values(err.response.data).join(', '));
      console.log(err);
    }
    dispatch({
      type: 'END_LOADING',
      payload: true,
    });
  };

  const inputFile = useRef(null);

  const addFile = () => {
    console.log('Add file');
    inputFile.current.click();
  };

  const addFileCompleted = async (event) => {
    const bodyFormData = new FormData();
    bodyFormData.append('image', event.target.files[0]);
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
      setImageUrl(response.data.url);
    } catch (err) {
      console.log(err);
    }
    dispatch({
      type: 'END_LOADING',
      payload: true,
    });
  };

  const [imageUrl, setImageUrl] = useState('');

  // Disable change content inside textfield
  const handleChange = () => {
    setImageUrl('');
  };

  const fetchProductFromId = async (id) => {
    try {
      const response = await axios({
        method: 'get',
        url: `http://localhost:8080/api/v1/shoes/${id}`,
      });
      const responseData = response.data;
      console.log(responseData);
      setName(responseData.name);
      setPrice(responseData.price);
      setImageUrl(responseData.coverImage);
      setDescription(responseData.description);
      setColors(responseData.colors.join(','));
      setSizes(responseData.sizes.join(','));
      setStatus(responseData.status);
      setPriceSales(responseData.priceSales);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    dispatch({
      type: 'START_LOADING',
      payload: true,
    });
    fetchProductFromId(id);
    dispatch({
      type: 'END_LOADING',
      payload: true,
    });
  }, [id, dispatch]);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleClickDelete = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleConfirmDelete = async () => {
    dispatch({
      type: 'START_LOADING',
      payload: true,
    });
    try {
      await axios({
        method: 'delete',
        url: `http://localhost:8080/api/v1/shoes/${id}`,
      });
    } catch (err) {
      console.log(err);
    }
    dispatch({
      type: 'END_LOADING',
      payload: true,
    });
    setOpenDeleteDialog(false);
    // navigate('/dashboard/products/all', { replace: true });
  }

  return (
    <>
      <div>
        <Dialog
          open={openDeleteDialog}
          onClose={handleCloseDeleteDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This item will be automated remove out of list and you can't reserve it
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteDialog}>Dismiss</Button>
            <Button color="error" onClick={handleConfirmDelete} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <Helmet>
        <title> Dashboard: Products | Minimal UI </title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0}>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" sx={{ mb: 5 }}>
            <Link underline="hover" key="1" color="#000000" onClick={handleClick}>
              <Typography variant="h4">Products</Typography>
            </Link>
            ,
            <Link underline="hover" key="2" color="#000000">
              <Typography variant="h4">Product Detail</Typography>
            </Link>
            ,
          </Breadcrumbs>
        </Stack>

        <Stack>
          <Stack direction="row" mb={3} spacing={5}>
            <TextField name="name" label="Shoes name" value={name} onInput={(e) => setName(e.target.value)} fullWidth />
            <TextField name="price" label="Price" value={price} onInput={(e) => setPrice(e.target.value)} fullWidth />
          </Stack>
          <Stack direction="row" mb={3} spacing={5}>
            <TextField
              name="coverImage"
              label="Cover Image"
              value={imageUrl}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachFileIcon />
                  </InputAdornment>
                ),
              }}
              onClick={addFile}
              onChange={handleChange}
              fullWidth
            />
            <input type="file" id="file" ref={inputFile} onChange={addFileCompleted} style={{ display: 'none' }} />
          </Stack>
          <Stack direction="row" mb={3} spacing={5}>
            <TextField
              name="description"
              label="Description"
              value={description}
              onInput={(e) => setDescription(e.target.value)}
              fullWidth
              multiline
            />
          </Stack>
          <Stack direction="row" mb={3} spacing={5}>
            <TextField name="sizes" label="Sizes" value={sizes} onInput={(e) => setSizes(e.target.value)} fullWidth />
            <TextField
              name="colors"
              label="Colors"
              value={colors}
              onInput={(e) => setColors(e.target.value)}
              fullWidth
            />
          </Stack>
          <Stack direction="row" mb={3} spacing={5}>
            <TextField
              id="outlined-select-currency"
              select
              label="Select"
              value={status}
              fullWidth
              onChange={(e) => setStatus(e.target.value)}
            >
              {allStatus.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              name="priceSales"
              label="Price Sales"
              value={priceSales}
              onInput={(e) => setPriceSales(e.target.value)}
              fullWidth
            />
          </Stack>
        </Stack>

        {isShowAlert && (
          <Stack mb={3}>
            <Alert severity={responseStatus}>
              <AlertTitle>{responseStatus === 'success' ? 'Success' : 'Error'}</AlertTitle>
              {titleErrorMessage} — <strong>{errorMessage}</strong>
            </Alert>
          </Stack>
        )}
        <Stack direction="row" mb={3} spacing={5}>
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            onClick={handleClickDelete}
            color="error"
          >
            Delete
          </LoadingButton>
          <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClickUpdate}>
            Update
          </LoadingButton>
        </Stack>
      </Container>
    </>
  );
}

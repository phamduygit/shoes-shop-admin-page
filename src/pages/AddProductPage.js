import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
// @mui
import { Alert, AlertTitle, Breadcrumbs, Container, Link, Stack, TextField, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';

// components
// import { ProductSort, ProductList, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
// import PRODUCTS from '../_mock/products';

// import { BlogPostsSearch } from '../sections/@dashboard/blog';

// import posts from '../_mock/blog';
// import { LoginForm } from '../sections/auth/login';

// ----------------------------------------------------------------------

export default function AddProductPage() {
  // const [openFilter, setOpenFilter] = useState(false);

  // const handleOpenFilter = () => {
  //   setOpenFilter(true);
  // };

  // const handleCloseFilter = () => {
  //   setOpenFilter(false);
  // };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/dashboard/products', { replace: true });
  };

  const [isShowAlert, setShowAlert] = useState(false);

  const [name, setName] = useState('');

  const [price, setPrice] = useState(0);

  const [coverImage, setCoverImage] = useState('');

  const [description, setDescription] = useState('');

  const [sizes, setSizes] = useState('');

  const [colors, setColors] = useState('');

  const handleClickSave = () => {
    // fetch('https://mywebsite.com/endpoint/', {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     firstParam: 'yourValue',
    //     secondParam: 'yourOtherValue',
    //   }),
    // });
    console.log(name, price, coverImage, description, sizes, colors);
    setShowAlert(true);
  };

  return (
    <>
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
            <Link underline="hover" key="1" color="#000000">
              <Typography variant="h4">Add Product</Typography>
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
              value={coverImage}
              onInput={(e) => setCoverImage(e.target.value)}
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
        </Stack>

        {isShowAlert && (
          <Stack mb={3}>
            <Alert severity="success">
              <AlertTitle>Success</AlertTitle>
              This is a success alert — <strong>check it out!</strong>
            </Alert>
          </Stack>
        )}
        <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClickSave}>
          Save
        </LoadingButton>
      </Container>
    </>
  );
}

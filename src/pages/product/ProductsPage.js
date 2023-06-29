import { Helmet } from 'react-helmet-async';
import { NavLink as RouterLink } from 'react-router-dom';
// @mui
import { Button, Container, Stack, Typography } from '@mui/material';
// components
import { ProductSort, ProductList } from '../../sections/@dashboard/products';
// mock
import Iconify from '../../components/iconify';

import ProductSearch from '../../components/product-search';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Products | Minimal UI </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="flex-start" justifyContent="space-between" mb={0}>
          <Typography variant="h4" sx={{mb: 3}}>
            Products
          </Typography>
          <Button
            component={RouterLink}
            to="/dashboard/products/add"
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Products
          </Button>
        </Stack>

        <Stack mb={2} direction="row" alignItems="center" justifyContent="space-between" flexWrap="wrap">
          <ProductSearch />
          <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end">
            <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
              <ProductSort />
            </Stack>
          </Stack>
        </Stack>

        <ProductList />
      </Container>
    </>
  );
}

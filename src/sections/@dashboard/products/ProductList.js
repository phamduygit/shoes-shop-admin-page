import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
// @mui
import { Grid, Pagination, Stack } from '@mui/material';
import ShopProductCard from './ProductCard';

// ----------------------------------------------------------------------

export default function ProductList({ ...other }) {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [page, setPage] = useState(1);
  const [totalPageNumber, setTotalPageNumber] = useState(0);

  const handleOnClickPageItem = (event, value) => {
    const queryParams = queryString.parseUrl(location.search).query;
    queryParams.page = value;
    const url = queryString.stringifyUrl(
      { url: '/dashboard/products/all', query: queryParams },
      {
        skipNull: true,
        skipEmptyString: true,
      }
    );
    navigate(url, { replace: true });
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const price = queryParams.get('price');
    const newest = queryParams.get('newest');
    const name = queryParams.get('name');
    const page = queryParams.get('page') != null ? queryParams.get('page') - 1 : null;
    if (page == null) {
      setPage(1)
    } else {
      setPage(page + 1)
    }
    const currentUrl = queryString.stringifyUrl(
      { url: 'http://localhost:8080/api/v1/shoes/all', query: { price, newest, name, page } },
      {
        skipNull: true,
        skipEmptyString: true,
      }
    );

    const fetchProductList = async (currentUrl) => {
      try {
        dispatch({
          type: 'START_LOADING',
          payload: true,
        });
        console.log(currentUrl);
        const response = await axios({
          method: 'get',
          url: currentUrl,
        });
        console.log(response);
        setProducts(response.data.data.data);
        setTotalPageNumber(response.data.totalPages);
        dispatch({
          type: 'END_LOADING',
          payload: true,
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetchProductList(currentUrl);
  }, [location.search, dispatch]);

  return (
    <>
      <Grid container spacing={3} {...other}>
        {products.map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={3}>
            <ShopProductCard product={product} />
          </Grid>
        ))}
      </Grid>
      <Stack mt={3} direction="row" alignItems="center" justifyContent="center" flexWrap="wrap">
        <Pagination count={totalPageNumber} page={page} shape="rounded" onChange={handleOnClickPageItem} />
      </Stack>
    </>
  );
}

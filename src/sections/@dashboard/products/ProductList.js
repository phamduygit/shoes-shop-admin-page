import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
// @mui
import { Grid } from '@mui/material';
import ShopProductCard from './ProductCard';

// ----------------------------------------------------------------------

export default function ProductList({ ...other }) {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const location = useLocation();
  
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const price = queryParams.get('price');
    const newest = queryParams.get('newest');
    const name = queryParams.get('name');
    const currentUrl = queryString.stringifyUrl(
      { url: 'http://localhost:8080/api/shoes/all', query: { price, newest, name } },
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
  
        setProducts(response.data.data);
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
    <Grid container spacing={3} {...other}>
      {products.map((product) => (
        <Grid key={product.id} item xs={12} sm={6} md={3}>
          <ShopProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}

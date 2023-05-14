import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
// @mui
import { Grid } from '@mui/material';
import ShopProductCard from './ProductCard';

// ----------------------------------------------------------------------

export default function ProductList({... other}) {
  const dispatch = useDispatch();
  const  [products, setProducts] = useState([]);
  const fetchProductList = async () => {
    try {
      const response = await axios({
        method: 'get',
        url: 'http://localhost:8080/api/shoes/all',
      });
      setProducts(response.data.data);
      console.log(products);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    dispatch({
      type: 'START_LOADING',
      payload: true,
    });
    fetchProductList();
    dispatch({
      type: 'END_LOADING',
      payload: true,
    });
  }, [products.length]);
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

import { Avatar, Container, List, ListItemButton, Stack, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { ListItemContent, ListItemDecorator } from '@mui/joy';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRightRounded';
import { useEffect, useState } from 'react';
import axios from '../../services/axios';


export default function BrandPage() {
  const dispatch = useDispatch();
  const [brands, setBrands] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    try {
      const fetchAllBrand = async () => {
        dispatch({
          type: 'START_LOADING',
          payload: true,
        });
        const res = await axios.get('/api/v1/brand-category');
        dispatch({
          type: 'END_LOADING',
          payload: false,
        });
        console.log(res);
        setBrands(res.data.data);
      };

      fetchAllBrand();
    } catch (error) {
      console.log('Brand page error: ', error);
    }
  }, [dispatch]);

  const handleOnClickBrand = (id) => {
    navigate(`/dashboard/brand/${id}`)
  }
  return (
    <>
      <Helmet>
        <title> Dashboard: Products | Minimal UI </title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Brand
          </Typography>
        </Stack>

        <List aria-labelledby="ellipsis-list-demo" sx={{ '--ListItemDecorator-size': '56px' }}>
          {brands.map((brand, index) => (
            <ListItemButton onClick={() => handleOnClickBrand(brand.id)} key={index}>
              <ListItemDecorator sx={{ alignSelf: 'flex-start' }}>
                <Avatar src={brand.image} />
              </ListItemDecorator>
              <ListItemContent>
                <Typography>{brand.name}</Typography>
              </ListItemContent>
              <KeyboardArrowRight fontSize="50" sx={{ color: 'text.tertiary' }} />
            </ListItemButton>
          ))}

          
          <ListItemButton onClick={() => navigate('/dashboard/brand/add')}>
            <ListItemDecorator sx={{ alignSelf: 'flex-start' }}>
              <Avatar src="/assets/icons/ic_add.svg" />
            </ListItemDecorator>
            <ListItemContent>
              <Typography>Add new brand</Typography>
            </ListItemContent>
          </ListItemButton>
        </List>

        {/* <ProductList/> */}
      </Container>
    </>
  );
}

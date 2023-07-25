import { Avatar, List, Container, ListItemButton, Stack, Typography, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ListItemContent, ListItemDecorator } from '@mui/joy';
import { Helmet } from 'react-helmet-async';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRightRounded';
import axios from '../../services/axios';

export default function PromotePage() {
  const dispatch = useDispatch();
  const [promotes, setPromote] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const fetchAllBrand = async () => {
        dispatch({
          type: 'START_LOADING',
          payload: true,
        });
        const res = await axios.get('/api/v1/promote');
        setPromote(res.data.data);
        dispatch({
          type: 'END_LOADING',
          payload: false,
        });
        console.log(res);
      };

      fetchAllBrand();
    } catch (error) {
      console.log('Brand page error: ', error);
    }
  }, [dispatch]);

  const handleOnClickPromote = (id) => {
    navigate(`/dashboard/promote/${id}`, {replace: false})
  };
  return (
    <>
      <Helmet>
        <title> Dashboard: Products | Minimal UI </title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Promote
          </Typography>
        </Stack>

        <List aria-labelledby="ellipsis-list-demo" sx={{ '--ListItemDecorator-size': '56px' }}>
          {promotes.map((promote, index) => (
            <ListItemButton onClick={() => handleOnClickPromote(promote.id)} key={index}>
              <ListItemDecorator sx={{ alignSelf: 'flex-start' }}>
                <Avatar src="/assets/icons/ic_discount.svg" />
              </ListItemDecorator>
              <ListItemContent>
                <Typography>
                  <Box sx={{ fontWeight: 'bold'}}>{promote.title}</Box>
                </Typography>
                <Typography level="body2" noWrap>
                  {promote.discountValue} %
                </Typography>
              </ListItemContent>

              <KeyboardArrowRight sx={{ color: 'text.tertiary' }} />
            </ListItemButton>
          ))}

          <ListItemButton onClick={() => navigate('/dashboard/promote/add')}>
            <ListItemDecorator sx={{ alignSelf: 'flex-start' }}>
              <Avatar src="/assets/icons/ic_add.svg" />
            </ListItemDecorator>
            <ListItemContent>
              <Typography>Add new promote</Typography>
            </ListItemContent>
          </ListItemButton>
        </List>
      </Container>
    </>
  );
}

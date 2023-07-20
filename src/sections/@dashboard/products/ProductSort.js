import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
// @mui
import { Menu, Button, MenuItem, Typography } from '@mui/material';
// component
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const SORT_BY_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'priceDesc', label: 'Price: High-Low' },
  { value: 'priceAsc', label: 'Price: Low-High' },
];

export default function ShopProductSort() {
  const location = useLocation();

  const [open, setOpen] = useState(null);

  const [sortType, setSortType] = useState('');

  const [sortTypeTitle, setSortTypeTitle] = useState('Feature');

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleOpen = (event) => {
    console.log('whaaa')
    setOpen(event.currentTarget);
  };

  const queryParams = queryString.parseUrl(location.search).query;

  useEffect(() => {
    if (sortType === '') {
      console.log(queryParams);
      if (queryParams && queryParams.price === '-1') {
        setSortTypeTitle('Price: Low-High');
        setSortType('priceDesc');
      } else if (queryParams && queryParams.price === '1') {
        setSortTypeTitle('Price: High-Low');
        setSortType('priceAsc');
      }
      else if (queryParams && queryParams.newest === 'true') {
        setSortTypeTitle('Newest');
        setSortType('newest');
      } else {
        setSortTypeTitle('Feature');
        setSortType('featured');
      }
    }
    
  }, [queryParams, sortType, sortTypeTitle]);

  const handleClose = (event) => {
    
    const selectedOption = SORT_BY_OPTIONS.find((option) => option.label === event.target.innerText);
    if (selectedOption == null) {
      setOpen(null);
      return;
    }
    setSortType(selectedOption.value);
    dispatch({
      type: selectedOption.value.toUpperCase(),
      payload: true,
    });
    setSortTypeTitle(selectedOption.label);
    let queryParams = null;
    switch (selectedOption.value) {
      case 'featured': {
        // Add new query params to current query params is default
        queryParams = queryString.parseUrl(location.search).query;
        queryParams.price = null;
        queryParams.newest = null;
        const url = queryString.stringifyUrl(
          { url: '/dashboard/products/all', query: queryParams },
          {
            skipNull: true,
            skipEmptyString: true,
          }
        );
        navigate(url, { replace: true });
        break;
      }
      case 'newest': {
        // Add new query params to current query params (newest is true)
        queryParams = queryString.parseUrl(location.search).query;
        queryParams.price = null;
        queryParams.newest = true;
        const url = queryString.stringifyUrl(
          { url: '/dashboard/products/all', query: queryParams },
          {
            skipNull: true,
            skipEmptyString: true,
          }
        );
        navigate(url, { replace: true });
        break;
      }
      case 'priceDesc': {
        // Add new query params to current query params (price decrease)
        queryParams = queryString.parseUrl(location.search).query;
        queryParams.price = -1;
        queryParams.newest = null;
        const url = queryString.stringifyUrl(
          { url: '/dashboard/products/all', query: queryParams },
          {
            skipNull: true,
            skipEmptyString: true,
          }
        );
        navigate(url, { replace: true });
        break;
      }
      case 'priceAsc': {
        // Add new query params to current query params (price increase)
        queryParams = queryString.parseUrl(location.search).query;
        queryParams.price = 1;
        queryParams.newest = null;
        const url = queryString.stringifyUrl(
          { url: '/dashboard/products/all', query: queryParams },
          {
            skipNull: true,
            skipEmptyString: true,
          }
        );
        navigate(url, { replace: true });
        break;
      }
      default:
        navigate('/dashboard/products/all', { replace: true });
        break;
    }
    setOpen(null);
  };

  return (
    <>
      <Button
        color="inherit"
        disableRipple
        onClick={handleOpen}
        endIcon={<Iconify icon={open ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'} />}
      >
        Sort By:&nbsp;
        <Typography component="span" variant="subtitle2" sx={{ color: 'text.secondary' }}>
          {sortTypeTitle}
        </Typography>
      </Button>
      <Menu
        anchorEl={open}
        open={Boolean(open)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {SORT_BY_OPTIONS.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === `${sortType}`}
            onClick={handleClose}
            sx={{ typography: 'body2' }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

import { useState } from 'react';
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

  const [sortType, setSortType] = useState('feature');

  const [sortTypeTitle, setSortTypeTitle] = useState('Feature');

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = (event) => {
    const selectedOption = SORT_BY_OPTIONS.find((option) => option.label === event.target.innerText);
    setSortType(selectedOption.value);
    dispatch({
      type: selectedOption.value.toUpperCase(),
      payload: true,
    });
    setSortTypeTitle(selectedOption.label);
    let queryParams = null;
    switch (selectedOption.value) {
      case 'featured': {
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

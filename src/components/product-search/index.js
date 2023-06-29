import { InputAdornment, TextField } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import queryString from 'query-string';
import Iconify from '../iconify/Iconify';

export default function ProductSearch() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState();
  const location = useLocation();
  const typingTimeoutRef = useRef(null);
  const handleOnChange = (event) => {
    setSearchText(event.target.value);
  };

  useEffect(() => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      const queryParams = queryString.parseUrl(location.search).query;
      
      if (queryParams.name !== searchText) {
        queryParams.page = null;
      }
      queryParams.name = searchText;

      const url = queryString.stringifyUrl(
        { url: '/dashboard/products/all', query: {'name': searchText} },
        {
          skipNull: true,
        }
      );
      console.log("Navigate bug here with query params: ", queryParams);
      if (url !== '/dashboard/products/all') {
        navigate(url, { replace: true });
      }
      
    }, 300);
  }, [location.search, navigate, searchText]);

  return (
    <>
      <TextField
        placeholder="Search post..."
        onChange={handleOnChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon={'eva:search-fill'} sx={{ ml: 1, width: 20, height: 20, color: 'text.disabled' }} />
            </InputAdornment>
          ),
        }}
      />
    </>
  );
}

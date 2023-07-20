import { useEffect, useRef, useState } from 'react';
import { InputAdornment, TextField } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

import queryString from 'query-string';
import Iconify from '../iconify/Iconify';


export default function ProductSearch() {
  const navigate = useNavigate();
  const location = useLocation();
  const typingTimeoutRef = useRef(null);
  const [searchText, setSearchText] = useState((queryString.parseUrl(location.search).query.name ?? ""));
  const [isChangeSearchText, setIsChangeSearchText] = useState(false);
  const handleOnChange = (event) => {
    setIsChangeSearchText(true);
    setSearchText(event.target.value);
  };


  useEffect(() => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      if (!isChangeSearchText) {
        return;
      }
      const url = queryString.stringifyUrl(
        { url: '/dashboard/products/all', query: {'name': searchText} },
        {
          skipNull: true,
          skipEmptyString: true,
        }
      );
      navigate(url, { replace: true });

    }, 300);
  }, [isChangeSearchText, navigate, searchText]);

  return (
    <>
      <TextField
        placeholder="Search product..."
        value={searchText}
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

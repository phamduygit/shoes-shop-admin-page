import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// @mui
import {
  Card,
  Table,
  Stack,
  // Paper,
  Avatar,
  // Button,
  Popover,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import Label from '../../components/label';
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
// sections
import { UserListHead } from '../../sections/@dashboard/user';
// mock
import USERLIST from '../../_mock/user';

import axios from '../../services/axios';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'product', label: 'Product', alignRight: false },
  { id: 'price', label: 'Price', alignRight: false },
  { id: 'quantity', label: 'Qauntity', alignRight: false },
  { id: 'userId', label: 'User ID', alignRight: false },
  { id: 'status', label: 'Shipping status', alignRight: false },
  { id: 'address', label: 'Address', alignRight: false },

  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function OrderPage() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  // const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [listOrder, setListOrder] = useState([]);

  const [selectedOrderId, setSelectedOrderId] = useState(0);

  const handleOpenMenu = (event, id) => {
    setOpen(event.currentTarget);
    setSelectedOrderId(id);
  };

  const handleOnClickEdit = () => {
    console.log(selectedOrderId);
    navigate(`/dashboard/order/${selectedOrderId}`, { replace: false });;
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - listOrder.length) : 0;

  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const fetchAllBrand = async () => {
        dispatch({
          type: 'START_LOADING',
          payload: true,
        });
        const res = await axios.get('/api/v1/order/admin');
        setListOrder(res.data.list);

        dispatch({
          type: 'END_LOADING',
          payload: false,
        });
      };

      fetchAllBrand();
    } catch (error) {
      console.log('Brand page error: ', error);
    }
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Order
          </Typography>
        </Stack>

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={listOrder.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {applySortFilter(listOrder, getComparator(order, orderBy), null)
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, productName, imageUrl, price, quantity, userId, shippingStatus, address } = row;
                      const selectedUser = selected.indexOf(productName) !== -1;

                      return (
                        <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                          <TableCell component="th" scope="row">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Avatar alt={productName} src={imageUrl} />
                              <Typography variant="subtitle2" noWrap>
                                {productName}
                              </Typography>
                            </Stack>
                          </TableCell>

                          <TableCell align="left">{price}</TableCell>

                          <TableCell align="left">{quantity}</TableCell>

                          <TableCell align="left">{userId}</TableCell>

                          <TableCell align="left">
                            <Label color={(shippingStatus === 'PREPARE' && 'error') || (shippingStatus === 'IN_DELIVERY' && 'warning') || (shippingStatus === 'WAIT_FOR_RECEIVE' && 'info') || 'success'}>
                              {shippingStatus}
                            </Label>
                          </TableCell>
                          <TableCell align="left">{address}</TableCell>

                          <TableCell align="right">
                            <IconButton size="large" color="inherit" onClick={(event) => handleOpenMenu(event, id)}>
                              <Iconify icon={'eva:more-vertical-fill'} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={listOrder.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem onClick={handleOnClickEdit}>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import { Link, Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Modal,
  ModalManager,
  ListItemIcon,
  ListItemText,
  Tooltip,
  IconButton,
  TextField,
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';


import { Adduserform, UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';
import axiosInstance from '../commom/interceptor';
import CommonService from '../commom/CommonService';
import TablePaggination from './TablePaggination';
import  RegisterForm  from '../sections/auth/register/RegisterForm';

// ----------------------------------------------------------------------

// <Dialog
// fullWidth={fullWidth}
// maxWidth={maxWidth}
// open={open}
// onClick={handleClose}
// >
// <DialogTitle>Add New User</DialogTitle>
// <DialogContent>
//   <DialogContentText>
//     You can set my maximum width and whether to adapt or not.
//       <RegisterForm />
//   </DialogContentText>
// </DialogContent>
// <DialogActions>
//   <Button onClick={handleClose}>Close</Button>
// </DialogActions>
// </Dialog>



// const [open, setOpen] = useState(false);
//   const [fullWidth, setFullWidth] = useState(true);
//   const [maxWidth, setMaxWidth] = useState('sm');

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleMaxWidthChange = (event) => {
//     setMaxWidth(
//       // @ts-expect-error autofill of arbitrary value is not handled.
//       event.target.value,
//     );
//   };

//   const handleFullWidthChange = (event) => {
//     setFullWidth(event.target.checked);
//   }; style : {justifyContent:"center" , display:"flex"}

// 

// 
const TABLE_HEAD = [
  { id: '_id' , label: 'ID' , alignRight:false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'email', label: 'Email', alignRight:false},
  { id: 'action' , label: "Actions" , alignRight: true}
];

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




export default function User() {

  const [users, setUsers] = useState([]);

  const [page, setPage] = useState(0);

  const [usersCount, setUsersCount] = useState(1);


  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [isSelected, setIsSelected] = useState(false)

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [open, setOpen] = useState(false);

  const [fullWidth, setFullWidth] = useState(true);

  const [maxWidth, setMaxWidth] = useState('sm');

  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMaxWidthChange = (event) => {
    setMaxWidth(
      // @ts-expect-error autofill of arbitrary value is not handled.
      event.target.value,
    );
  };

  const handleFullWidthChange = (event) => {
    setFullWidth(event.target.checked);
  };
  



  useEffect(() => {
    getAllUserdata();

}, [rowsPerPage,page]);

   const getAllUserdata = () => {
    

    CommonService.httpGet(`http://103.206.139.86:5000/api/v1/users`,true).then((response) => {
    //  console.log(response.data);  
    console.log(response.data.data.users);
      console.log(response.data.results);  
        setUsers(response.data.data.users);
        setUsersCount(response.data.results);
        console.log("in api...");
  })


  }

  const handleDelete = async(_id) => {
    CommonService.httpDelete(`http://103.206.139.86:5000/api/v1/users/${_id}`,true).then((response) => {
      console.log('Successfully deleted user..!!');
//       if (response.data.message === 'success') {
//           console.log("delete");
//     }
// })
// .catch((error) => {
//     console.log("error in delete");  
// });
      const newdata = users.filter((item) => {
        return item._id !== _id;
      })
      console.log("Deleted!!");
        setUsers(newdata);
    })
}


    const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    console.log("Before all");
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n._id);
      console.log("newselected",newSelecteds);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, _id) => {
    console.log("Before single click");
    const selectedIndex = selected.indexOf(_id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, _id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    console.log('sing click list ,',newSelected);
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    console.log("page",newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };
 
//  console.log('page length', Math.max(0, (1 + page) * rowsPerPage - users.length));

  // const emptyRows =  users.length > 0 ? users.length : 0;
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  const filteredUsers = applySortFilter(users, getComparator(order, orderBy), filterName);

  // console.log("set filter",filteredUsers);

  const isUserNotFound = filteredUsers.length === 0;

  // //console.log('isUserNotFound',isUserNotFound);


  

  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
          <Button variant="contained" component={RouterLink} onClick={handleClickOpen} startIcon={<Iconify icon="eva:plus-fill" />}>
            New User
          </Button>
          <Dialog
            fullWidth={fullWidth}
            maxWidth={maxWidth}
            open={open}
            onClose={handleClose}
            >
            <DialogTitle>Add New User</DialogTitle>
            <DialogContent>
              <DialogContentText>
                  <Adduserform />
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} style={{marginBottom:10}} variant='contained' color='primary' >Close</Button>
            </DialogActions>
            </Dialog>

        </Stack>

        <Card>
        {
            !isSelected && (<UserListToolbar numSelected={selected.length} filterName={filterName} handleDelete={handleDelete} _id onFilterName={handleFilterByName} />)
        }
          

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={users.length}   
                  // rowCount={users.length} USERLIST usersCount
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />

                <TableBody>
                  { filteredUsers.map((row) => {
                    const { _id, name, email, avatarUrl } = row;
                    const isItemSelected = selected.indexOf(_id) !== -1;

                    return (
                      <TableRow
                        hover
                        key={_id}
                        tabIndex={-1}
                        role="checkbox"
                        onClick={(event) => handleClick(event, _id)} 
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={isItemSelected} 
                          inputProps={{'aria-labelledby': _id}}
                          // onChange={(event) => handleClick(event, name)}
                          />
                        </TableCell>
                        <TableCell>{_id}</TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={name} src={avatarUrl} />
                            <Typography variant="subtitle2" noWrap>
                            {name}  
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{email} </TableCell>

                        <TableCell align="right">
                      { /* <ListItemIcon>
                        <Iconify icon="eva:trash-2-outline" width={24} height={24} />
                      </ListItemIcon>
                    <ListItemText primary="Delete" onClick={() => handleDelete(_id)} onClick={() => handleDelete(_id)} primaryTypographyProps={{ variant: 'body2' }} />   */ }
                        <Tooltip title="Edit">
                        <IconButton ><Link to={`edituser/${_id}`} style={{textDecoration:"none"}} ><EditIcon color='primary' /></Link>
                        </IconButton>
                        </Tooltip>
                    
                      <Tooltip title="Delete" style={{marginTop:'-5px'}} >
                          <IconButton onClick={() => handleDelete(_id)} ><DeleteIcon color='secondary'  />
                          </IconButton>
                      </Tooltip>
                        
                      </TableCell>
                      </TableRow>
                    );
                  })}
              {/*    {emptyRows > 0 && (
                    <TableRow >
                      hello
                    </TableRow>


                     {emptyRows > 0 && (
                                <TableRow style={{height: (dense ? 33 : 53) * emptyRows}}>
                                    <TableCell colSpan={6}/>
                                </TableRow>
                            )}
                
              )}  */}
                </TableBody>

                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            {/*  <TableRow>
              <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={users.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaggination}
            /> 
              </TableRow> */}
            </TableContainer>
          </Scrollbar>
          <TablePagination
          rowsPerPageOptions={[5, 10, 25,50]}
          component="div"
          count={usersCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={TablePaggination}
        /> 
        </Card>
      </Container>
    </Page>
  );
}

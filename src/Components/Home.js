import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
 
//Imports for Material UI is coded here -
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@material-ui/core';
import { loadUsers } from '../Redux/actions';
import { deleteUser } from '../Redux/actions';
import { Button , ButtonGroup } from '@mui/material';
import TextField from '@mui/material/TextField';
 
const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        marginTop: theme.spacing(3),
        overflowX: "auto"
    },
    table: {
        minWidth: 650
    },
    selectTableCell: {
        width: 60
    },
    tableCell: {
        width: 130,
        height: 40
    },
    input: {
        width: 130,
        height: 40
    }
}));
 
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));
 
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

//Component Starts here--->
 
const Home = () => {
    const classes = useStyles();
    const [rows , setRows] = useState([]);
    const [previous, setPrevious] = useState({});
    let dispatch = useDispatch();
 
    const { users } = useSelector(state => state.users)
 
    useEffect(() => {
        dispatch(loadUsers());
    }, [])
 
    const deletion = (id) => {
        if(window.confirm("Are you sure about deleting a perticular Data?")){
            dispatch(deleteUser(id))
        }
    }
 
    // Editable Functionality-->
    const onToggleEditMode = id => {
    setRows(state => {
      return rows.map(row => {
        if (row.id === id) {
          return { ...row, isEditMode: !row.isEditMode };
        }
        return row;
      });
    });
  };
 
    const onChange = (e, row) => {
    if (!previous[row.id]) {
      setPrevious(state => ({ ...state, [row.id]: row }));
    }
    const value = e.target.value;
    const name = e.target.name;
    const { id } = row;
    const newRows = rows.map(row => {
      if (row.id === id) {
        return { ...row, [name]: value };
      }
      return row;
    });
    setRows(newRows);
  };
 
    // const onRevert = id => {
  //   const newRows = rows.map(row => {
  //     if (row.id === id) {
  //       return previous[id] ? previous[id] : row;
  //     }
  //     return row;
  //   });
  //   setRows(newRows);
  //   setPrevious(state => {
  //     delete state[id];;
  //     return state;
  //   });
  //   onToggleEditMode(id);
  // };
 
    // const currentlyEditing = editIdx === i ;
 
    return (
        <React.Fragment>
        <div className={classes.root}>
        <TableContainer component={Paper} className={classes.table}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">ID</StyledTableCell>
                        <StyledTableCell align="center">Email</StyledTableCell>
                        <StyledTableCell align="center">FirstName</StyledTableCell>
                        <StyledTableCell align="center">LastName</StyledTableCell>
                        <StyledTableCell align="center">Avatar</StyledTableCell>
                        <StyledTableCell align="center">Actions</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users && users.map((user) => (
                        <StyledTableRow key={user.id}>
                            <StyledTableCell component="th" scope="row">
                                {user.id}
                            </StyledTableCell>
                            <StyledTableCell align="center" isEditMode={true}>{user.email}</StyledTableCell>
                            <StyledTableCell align="center">{user.first_name}</StyledTableCell>
                            <StyledTableCell align="center">{user.last_name}</StyledTableCell>
                            <StyledTableCell align="center" img={user.avatar}>{user.avatar}</StyledTableCell>
                            <StyledTableCell align="center" >
                            <ButtonGroup variant="outlined" aria-label="outlined button group">
                                <Button  style={{backgroundColor:'blue' , color:'white'}}>Edit</Button>
                                <Button  style={{backgroundColor:'red' , color:'white'}} onClick={() => deletion(user.id)}>Delete</Button>
                            </ButtonGroup>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </div>
        </React.Fragment>
    );
 
}
 
export default Home;
 


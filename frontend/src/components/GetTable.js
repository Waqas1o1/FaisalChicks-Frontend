import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
// import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Button, Grid, IconButton, TablePagination } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';

const useStyles = makeStyles(theme=>({
  root: {
    flexGrow:1,
    '@media only screen and (max-width: 600px)': {
      width:'50vh',
      padding: theme.spacing(2),
     },
  },
  container: {
    maxHeight: 440,
  },
}));

export default function GetTable(props) {
  const classes = useStyles();
  const {rows,columns,onDelete, onUpdate} = props;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  
  return (
    <Paper className={classes.root} elevation={3}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column}
                  align="center"
                  // style={{ minWidth: column.minWidth }}
                >
                  {column}
                </TableCell>
              ))}
              <TableCell
                  key={'action'}
                  align="center"
                >
                  Action
                </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            
            {rows.map((row) => {
              return (
                <TableRow key={row.id}>
                  {Object.entries(row).map(([key, value]) =>{
                    return(
                      <TableCell align="center" key={key}>{value}</TableCell>
                    )
                  })}
               <TableCell align="center" key='0' >
                  <Grid  container
                        direction="row"
                        justifyContent="space-evenly"
                        alignItems="center"
                        spacing={1}
                        >
                    <Grid item xs={6}>
                      <Button aria-label="delete" color="secondary" size='small' onClick={onDelete} id={row.id}>
                        <DeleteIcon />
                      </Button>
                    </Grid>
                    <Grid item xs={6} onClick={onUpdate} id={row.id}>
                      <IconButton aria-label="edit" size='small' key={row.id}>
                        <CreateIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </TableCell>
              </TableRow>)
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

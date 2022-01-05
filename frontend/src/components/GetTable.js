import React from 'react';
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
import GetAppIcon from '@material-ui/icons/GetApp';


export default function GetTable(props) {
  const {rows,columns,onDelete, onUpdate} = props;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }
  return (
    <Paper elevation={3}>
      <TableContainer >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column}
                  align="center"
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
                      (validURL(value)?
                      <TableCell align="center" key={key}>
                        <IconButton aria-label="edit" size='small' key={row.id} href={value} download target='blank'>
                          <GetAppIcon />
                        </IconButton>
                      </TableCell>
                      :
                      <TableCell align="center" key={key}>
                        {value}
                      </TableCell>
                      )
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

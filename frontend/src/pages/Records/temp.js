
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    Grid,
    Typography,
    TablePagination,
    TableFooter
 } from '@material-ui/core';
import axiosInstance from '../../apisConfig';

const useStyles = makeStyles((theme) => ({
    table: {
      minWidth: 650,
    },
    tableContainer: {
        borderRadius: 15,
        margin: '10px 10px',
        maxWidth: 950
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.getContrastText(theme.palette.primary.dark)
    },
    avatar: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.getContrastText(theme.palette.primary.light)
    },
    name: {
        fontWeight: 'bold',
        marginTop:'10px',
        marginLeft:'5px',
        color: theme.palette.primary.dark
    },
    status: {
        fontWeight: 'bold',
        fontSize: '0.75rem',
        color: 'white',
        backgroundColor: 'grey',
        borderRadius: 8,
        padding: '3px 10px',
        display: 'inline-block'
    },
  }));

 
  function OrderView() {
      const classes = useStyles();
      const [page, setPage] = React.useState(0);
      const [orders,setOrders] = React.useState([]);

  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  async function fetchOrders(){
      await axiosInstance.get('PartyOrder/')
      .then(res=>{
        if (res['error'] === true){
            alert(`Error Occures ${res['message']}`);
        }
        else{
            var d = res['data']['data'];
            for (let order in d){
                d[order].party = d[order].party.name
                d[order].sale_officer = d[order].sale_officer.name 
            }
            setOrders(d);
            localStorage.removeItem('partyOrders');
            localStorage.setItem('partyOrders',JSON.stringify(d));
        }
    })
    // .catch(error=>{
    //     alert(`Somethin wrong: ${error}`);
    // })
  }

  React.useEffect(() => {
      fetchOrders()
  }, [])
  return (  
      <Grid container justifyContent='center'>
          <Grid item>
                <Typography variant='h3' color='primary' >Order's</Typography>
          </Grid>
          <Grid item container justifyContent='center'>
                <TableContainer component={Paper} className={classes.tableContainer}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell className={classes.tableHeaderCell}>So.</TableCell>
                            <TableCell className={classes.tableHeaderCell}>Sale officer</TableCell>
                            <TableCell className={classes.tableHeaderCell}>Party</TableCell>
                            <TableCell className={classes.tableHeaderCell}>Description</TableCell>
                            <TableCell className={classes.tableHeaderCell}>Freight</TableCell>
                            <TableCell className={classes.tableHeaderCell}>Discounted Amount</TableCell>
                            <TableCell className={classes.tableHeaderCell}>Total Amount</TableCell>
                            <TableCell className={classes.tableHeaderCell}>Status</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <TableRow key={row.id}>
                            <TableCell>
                                <Grid container>
                                    <Grid item lg={2}>
                                        <Avatar alt={row.sale_officer} src='.' className={classes.avatar}/>
                                    </Grid>
                                    <Grid item lg={10}>
                                        <Typography className={classes.name}>
                                            {row.date}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                </TableCell>
                            <TableCell><b>{row.sale_officer}</b></TableCell>
                            <TableCell><b>{row.party}</b></TableCell>
                            <TableCell>
                                <Typography variant="subtitle2">{row.description}</Typography>
                            </TableCell>
                            <TableCell><Typography > {row.freight}</Typography></TableCell>
                            <TableCell><Typography color="secondary">{row.discounted_amount}</Typography></TableCell>
                            <TableCell><Typography color="secondary">{row.total_amount}</Typography></TableCell>
                            <TableCell>
                                <Typography 
                                    className={classes.status}
                                    style={{
                                        backgroundColor: 
                                        ((row.status === 'Approved' && 'green') ||
                                        (row.status === 'Pending' && 'blue') ||
                                        (row.status === 'Blocked' && 'orange'))
                                    }}
                                >{row.status}</Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                        <TableFooter >
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 15]}
                                component="tr"
                                count={orders.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </TableFooter>
                    </Table>
                </TableContainer>
            </Grid>
      </Grid>
   
  );
}

export default OrderView;
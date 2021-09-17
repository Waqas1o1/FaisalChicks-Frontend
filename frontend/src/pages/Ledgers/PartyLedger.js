import { Grid, makeStyles, Typography } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import Selecter from '../../components/Selecter'
import DateFnsUtils from '@date-io/date-fns';
import axiosInstance  from '../../apisConfig'
import SpineerButton from '../../components/SpineerButton';
import {MuiPickersUtilsProvider,KeyboardDatePicker,} from '@material-ui/pickers';
import HourglassFullRoundedIcon from '@material-ui/icons/HourglassFullRounded';
import StorageRoundedIcon from '@material-ui/icons/StorageRounded';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);
    

const useStyles = makeStyles((theme) => ({
    formRoot: {
      flexGrow: 1,
      padding : theme.spacing(2),
    },
    selecter:{
        marginTop:'20px',
        maxWidth:'200px',
    },
    table: {
        minWidth: 700,
    }
}))

const columns = ['Date','Description','Category','Product','Qty','Rate','Freight','Transaction Type','Total Amount','Net Balance']

export default function PartyLedger() {
    var date = new Date();
    const initialFields = {
        party:'Select Party',
        FromDate: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
        ToDate: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
    }
    
    const classes = useStyles();
    const [fields,setFields] = useState(initialFields);    
    const [parties,setParties] = useState([]);    
    const [loading,setLoading] = useState(false);    
    const [choice,setChoice] = useState(initialFields.party);
    const [rows,setRows] = useState([]);
    

    async function fetchParties(){
        if (navigator.onLine){
            return await axiosInstance.get('Party/')
            .then(res=>{
                let data  = res.data;
                if (data['error'] === true){
                    alert(`Error Occures ${data['message']}`);
                }
                else{
                    let parties = data['data'];
                    for (let p in parties){
                        parties[p].discount = parties[p].discount.discount;
                        delete parties[p].date
                        delete parties[p].current_Balance
                    }
                    setParties(parties);
                    localStorage.removeItem('Parties');
                    localStorage.setItem('Parties',JSON.stringify(parties));
                }
            })
            .catch(error=>{
                alert(`Somethin wrong: ${error}`);
            })
        }
        else{
            setParties(JSON.parse(localStorage.getItem('Parties')));
        }
    }
    
    async function fetchLedger(){
        if (navigator.onLine){
            return await axiosInstance.get(`PartyLedger/${fields.party}/${fields.FromDate}/${fields.ToDate}`)
            .then(res=>{
                let data  = res.data;
                if (data['error'] === true){
                    alert(`Error Occures ${data['message']}`);
                    setRows(parties);
                }
                else{
                    let parties = data;
                    for (var p in parties){
                        parties[p].category = parties[p].category.name
                        parties[p].party = parties[p].party.name 
                        parties[p].sales_officer = parties[p].sales_officer.name
                        parties[p].product = parties[p].product.name
                    }
                    console.log(parties);
                    setRows(parties);
                    setLoading(false);
                    localStorage.removeItem('PartyLedger');
                    localStorage.setItem('PartyLedger',JSON.stringify(parties));
                }
            })
            .catch(error=>{
                setLoading(false);
                console.log(`${error}`);
            })
        }
        else{
            setRows(JSON.parse(localStorage.getItem('PartyLedger')));
        }
    }

    const handleFromDateChange = (date) => {
        var date =  date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        setFields({
            ...fields,
            'FromDate' : String(date)
        })
    };

    const handleToDateChange = (date) => {
        var date =  date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        setFields({
            ...fields,
            'ToDate' : String(date)
        })
    };

    const handleButtonClick =()=>{
        setLoading(true);
        if (fields !== initialFields){
            fetchLedger();
        }
    }
    
    const FiledChange = (event) => {
        if (event.target.name === 'party'){
            setChoice(event.target.value);
        }
        setFields({
            ...fields,
            [event.target.name] : event.target.value,
        });
    };

    const selecterOpen = ()=>{

    }
    
    
   
    useEffect(() => {
        fetchParties()
    }, [])

    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
        >
           {/* Title */}
           <Grid item xs={12} >     
                <Typography variant="h4" gutterBottom  color='primary'>Parties Ledger</Typography>
            </Grid>
            
           <Grid item  xs={12} md={3} lg={2} className={classes.selecter}>
                <Selecter
                     title={choice}
                     handleChange={FiledChange}
                     value={fields.party}
                     onOpen={selecterOpen}
                     choises={parties}
                     name='party'
                />
           </Grid>
           
           <Grid item xs={4} md={3} lg={2}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    autoOk
                    format='yyyy-MM-dd'
                    id='FromDate'
                    name='FromDate'
                    value={fields.FromDate}
                    onChange={handleFromDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'Select From Date',
                        }}
                    />
                </MuiPickersUtilsProvider>
           </Grid>
          
           <Grid item xs={4} md={3} lg={2}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        autoOk
                        format='yyyy-MM-dd'
                        id='ToDate'
                        name='ToDate'
                        value={fields.ToDate}
                        onChange={handleToDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'Select ToDate',
                            }}
                        />
                </MuiPickersUtilsProvider>
           </Grid>
            
            <Grid item xs={4} md={3} lg={2}>
                    <SpineerButton
                    className={classes.selecter}
                     handleButtonClick={handleButtonClick} 
                     label={(loading?'Loadning':'Get Data')}
                     loading={loading}
                     success={false}
                     size="large"
                     startIcon={(loading? <HourglassFullRoundedIcon/>:<StorageRoundedIcon />)}
                    />
            </Grid>
            {/* TAble */}
            <Grid item xs={12}>
                <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="customized table">
                            <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                        <StyledTableCell
                                            key={column}
                                            align="center"
                                            // style={{ minWidth: column.minWidth }}
                                            >
                                            {column}
                                        </StyledTableCell>
                                    ))}
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {rows.map((row) => (
                                <StyledTableRow key={row.id}>
                                    <StyledTableCell component="th" scope="row">{row.date}</StyledTableCell>
                                    <StyledTableCell align='center' >{row.description}</StyledTableCell>
                                    <StyledTableCell align='center' >{row.category}</StyledTableCell>
                                    <StyledTableCell align='center' >{row.product}</StyledTableCell>
                                    <StyledTableCell align='center' >{row.qty}</StyledTableCell>
                                    <StyledTableCell align='center' >{row.rate}</StyledTableCell>
                                    <StyledTableCell align='center' >{row.freight}</StyledTableCell>
                                    <StyledTableCell align='center' >{row.transaction_type}</StyledTableCell>
                                    <StyledTableCell align='center' >{row.total_amount}</StyledTableCell>
                                    <StyledTableCell align='center' >{row.net_balance}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                            </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
       </Grid>
    )
}

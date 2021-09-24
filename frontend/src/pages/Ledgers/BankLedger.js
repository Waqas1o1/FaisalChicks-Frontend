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

const columns = ['Date','Description','Transaction Type','Total Amount','Net Balance']

export default function BankLedger() {
    var date = new Date();
    const initialFields = {
        bank:'Select Bank',
        FromDate: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
        ToDate: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
    }
    
    const classes = useStyles();
    const [fields,setFields] = useState(initialFields);    
    const [banks,setBanks] = useState([]);    
    const [loading,setLoading] = useState(false);    
    const [choice,setChoice] = useState(initialFields.bank);
    const [rows,setRows] = useState([]);
    

    async function fetchBanks(){
        if (navigator.onLine){
            return await axiosInstance.get('Bank/')
            .then(res=>{
                let data  = res.data;
                if (data['error'] === true){
                    alert(`Error Occures ${data['message']}`);
                }
                else{
                    var d = data['data'];
                    for (let p in d){
                        delete d[p].date
                        delete d[p].current_Balance
                    }
                    setBanks(d);
                    localStorage.removeItem('BankLedger');
                    localStorage.setItem('BankLedger',JSON.stringify(d));
                }
            })
            .catch(error=>{
                alert(`Somethin wrong: ${error}`);
            })
        }
        else{
            setBanks(JSON.parse(localStorage.getItem('BankLedger')));
        }
    }
    
    async function fetchLedger(){
        if (navigator.onLine){
            return await axiosInstance.get(`BankLedger/${fields.bank}/${fields.FromDate}/${fields.ToDate}`)
            .then(res=>{
                let data  = res;
                if (data['error'] === true){
                    alert(`Error Occures ${data['message']}`);
                    setRows(data);
                }
                else{
                    let data = res.data;
                    for (var p in data){
                        data[p].bank = data[p].bank.name
                    }
                    setRows(data);
                    setLoading(false);
                    localStorage.removeItem('BankLedger');
                    localStorage.setItem('BankLedger',JSON.stringify(banks));
                }
            })
            .catch(error=>{
                setLoading(false);
                console.log(`${error}`);
            })
        }
        else{
            setRows(JSON.parse(localStorage.getItem('BankLedger')));
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
        if (event.target.name === 'bank'){
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
        fetchBanks()
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
                <Typography variant="h4" gutterBottom  color='primary'>Bank Ledger</Typography>
            </Grid>
            
           <Grid item  xs={12} md={3} lg={2} className={classes.selecter}>
                <Selecter
                     title={choice}
                     handleChange={FiledChange}
                     value={fields.salesOfficer}
                     onOpen={selecterOpen}
                     choises={banks}
                     name='bank'
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

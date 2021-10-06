import { Button, Chip, FormControl, Grid, IconButton, Input, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/styles';
import React, { useEffect, useState } from 'react';
import CachedIcon from '@material-ui/icons/Cached';
import Selecter from '../../components/Selecter';
import axiosInstance from '../../apisConfig';
import InputField from '../../components/InputField';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItems from '../../components/MenuItems';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
  ];
const useStyles = makeStyles((theme) => ({
    formRoot: {
      flexGrow: 1,
      padding : theme.spacing(2),
    },
    table: {
        '& .MuiDataGrid-columnHeader': {
            backgroundColor: theme.palette.primary.dark,
            cursor: 'pointer',
        },
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
      },
    chip: {
    margin: 2,
    },
}))


const Recovery = () => {
    const theme = useTheme();
    const initialFields = {
        party_orders:[],
        sale_officer:'',
        payment_method:'Cash',
        bank: '',
        description: ''
    };
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
          style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
          },
        },
      };
    const classes = useStyles();
    const [amount,setAmount] = useState(0);
    const [fields,setFields] = useState(initialFields);
    const [partyOrders,setPartyOrders] = useState([]);
    // Bank
    const [banks,setBanks] = useState([]);
    const [bankTitle,setBankTitle] = useState('Select Bank');
    // Sales Officer
    const [salesOfficer,setSalesOfficer] = useState([]);
    const [salesOfficerTitle,setSalesOfficerTitle] = useState('Sales Officer');

    const [openDialog, setOpenDialog] = useState(false);
    const [bankDisabled,setBankDisabled] = useState(true);
    const [selectedOption,setSelectedOption] = useState(fields.payment_method);
    const [choices, setChoises] = React.useState([]);

    
    const handleChange = (event) => {
        setChoises(event.target.value);
    };

  
  
    async function fetchBank(){
        if (navigator.onLine){
            return await axiosInstance.get('apis/Bank/')
            .then(res=>{
                let data  = res.data;
                if (data['error'] === true){
                    alert(`Error Occures ${data['message']}`);
                }
                else{
                    let bank = data['data'];
                    for (let b in bank){
                        delete bank[b].date
                        delete bank[b].current_Balance
                    }
                    setBanks(bank);
                    localStorage.removeItem('Bank');
                    localStorage.setItem('Bank',JSON.stringify(bank));
                }
            })
            .catch(error=>{
                alert(`Somethin wrong: ${error}`);
            })
        }
        else{
            setBanks(JSON.parse(localStorage.getItem('Bank')));
        }
    }

    
    
    async function fetchSalesOfficers(){
        if (navigator.onLine){
            return await axiosInstance.get('apis/SalesOfficer/')
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
                    setSalesOfficer(d);
                    localStorage.removeItem('SalesOfficer');
                    localStorage.setItem('SalesOfficer',JSON.stringify(d));
                }
            })
            .catch(error=>{
                alert(`Somethin wrong: ${error}`);
            })
        }
        else{
            setSalesOfficer(JSON.parse(localStorage.getItem('SalesOfficer')));
        }
    }



    async function ConfirmDelete(e){
        return await axiosInstance.delete(`apis/Recovery/`)
        .then(res=>{
            let data  = res.data;
            if (data['error'] === true){
                alert(`Error Occures ${data['message']}`);
            }
            else{
                setFields(initialFields);
                setOpenDialog(false);
            }
        })
        .catch(error=>{
            alert(`Somethin wrong: ${error}`);
            setOpenDialog(false);
        })
        
    
    }

  
    const selecterOpen = (event)=>{
        // fetchDiscounts();
        
    }

   
    const FiledChange = (event) => {
        if (event.target.name === 'bank'){
            const index = event.target.selectedIndex;
            const optionElement = event.target.childNodes[index];
            const optionElementId = optionElement.getAttribute('id');
            const obj = JSON.parse(optionElementId);
            setBankTitle(obj.name);

        }
        if (event.target.name === 'sale_officer'){
            const index = event.target.selectedIndex;
            const optionElement = event.target.childNodes[index];
            const optionElementId = optionElement.getAttribute('id');
            const obj = JSON.parse(optionElementId);
            setSalesOfficerTitle(obj.name);
        }
      
        setFields({
            ...fields,
            [event.target.name] : event.target.value,
        });
    };

    async function fetchReleventOrders(a){
        return await axiosInstance.get(`apis/GetPartyOrderByAmount/${a}`)
        .then(res=>{
            let data  = res.data.data;
            if (data['error'] === true){
                alert(`Error Occures ${data['message']}`);
            }
            else{
                for (let d in data){
                    data[d].recovery_amount = 0 
                }
                setPartyOrders(data);
                setChoises([{'id':1}]);
            }
        })
        .catch(error=>{
            alert(`Somethin wrong: ${error}`);
            setOpenDialog(false);
        })
    }

    const handleAmountChange = (e)=>{
        var a;
        if (e.target.value === undefined || e.target.value === null){
            a = 0
        }
        else{
            a = e.target.value
        }
        setAmount(e.target.value);
        fetchReleventOrders(a);
    }

    const handleClose = () => {
        setOpenDialog(false);
    };
    const handleMenuChange = (event) => {
        setSelectedOption(event.target.value);
        setFields({
            ...fields,
            'payment_method' : event.target.value,
        });
        if (event.target.value === 'Bank'){
            setBankDisabled(false);
        }
        else{
            setBankDisabled(true);
        }
      };
        
    useEffect(() => {
            fetchBank();
            fetchSalesOfficers();
        }, []);

  
    return (
        <Grid container spacing={2} className={classes.formRoot}>
            {/* Title */}
            <Grid item xs={11} >     
                <Typography variant="h4" gutterBottom  color='primary'>Recovery</Typography>
            </Grid>
            {/* Left */}
            <Grid item xs={1}>
                <Button>
                    <CachedIcon ></CachedIcon>
                </Button>     
            </Grid>
            
            <Grid item xs={12} md={3} lg={3}>
                <Grid container item direction='column' spacing={3}>
                    
                            
                    {/* Sales Ofiicer Select */}
                    <Grid item xs>
                        <Selecter
                            title={salesOfficerTitle}
                            handleChange={FiledChange}
                            value={fields.sale_officer}
                            onOpen={selecterOpen}
                            choises={salesOfficer}
                            name='sale_officer'
                            />
                    </Grid>
                    <Grid item xs>
                        <InputField  size='small'
                            label="Recovery Amount" 
                            type="string" 
                            fullWidth
                            onChange={handleAmountChange} 
                            name='RecoveryAmount'
                            value={amount}
                            />
                    </Grid>
                     <Grid item xs>
                        <FormControl className={classes.formControl}   fullWidth>
                            <InputLabel id="demo-mutiple-chip-label">Select Party Orders</InputLabel>
                            <Select
                            labelId="demo-mutiple-chip-label"
                            id="demo-mutiple-chip"
                            multiple
                          
                            value={choices}
                            onChange={handleChange}
                            input={<Input id="select-multiple-chip" />}
                            renderValue={(selected) => (
                                <div className={classes.chips}>
                                {selected.map((value) => (
                                    <Chip key={value} label={value} className={classes.chip} />
                                ))}
                                </div>
                            )}
                            MenuProps={MenuProps}
                            >
                            {choices.map((choise) => (
                                <MenuItem key={0} value={'dd'} style={getStyles(choise.id, choise.id, theme)}>
                                {/* {choise.party.name} */}
                                h1
                                </MenuItem>
                            ))}
                            </Select>
                        </FormControl>
                    </Grid>
                     
                    {/* Payment Method */}
                    <Grid item >
                        <MenuItems
                            options={['Cash','Clearing','Bank']}
                            title='Payment Method'
                            handleChange={handleMenuChange}
                            selectedOption={selectedOption}
                        />
                    </Grid>
                    
                    {/* Banks */}
                    <Grid item xs>
                     <Selecter
                        title={bankTitle}
                        handleChange={FiledChange}
                        value={fields.bank}
                        onOpen={selecterOpen}
                        choises={banks}
                        name='bank'
                        disabled={bankDisabled}
                     />
                    </Grid>
                </Grid>
           </Grid>
            {/* Right */}
           <Grid item xs={12} md={9} lg={9}>
            <div style={{ height: 500, width: '100%'}}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell >ID</TableCell>
                            <TableCell >Party</TableCell>
                            <TableCell >Cotact</TableCell>
                            <TableCell >Total Amount</TableCell>
                            <TableCell >Pandding Amount</TableCell>
                            <TableCell  style={{color:'red'}}>Recovery Added</TableCell>
                            <TableCell align='center'>Action</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {partyOrders.map((row)=>{
                            return(
                                <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.date}
                                </TableCell>
                                <TableCell component="th">
                                    {row.id}
                                </TableCell>
                                <TableCell component="th">
                                    {row.party.name}
                                </TableCell>
                                <TableCell component="th">
                                    {row.party.contact}
                                </TableCell>
                                <TableCell component="th">
                                    {row.total_amount}
                                </TableCell>
                                <TableCell component="th">
                                    {row.pandding_amount}
                                </TableCell>
                                <TableCell component="th">
                                    {row.recovery_amount}
                                </TableCell>
                                <TableCell component="th">
                                    <Grid  container
                                            alignItems="center"
                                            justifyContent="flex-end"
                                            spacing={1}
                                            >
                                        <Grid item xs>
                                        <Button aria-label="delete" color="secondary" size='small' >
                                            <DeleteIcon />
                                        </Button>
                                        </Grid>
                                        <Grid item xs>
                                        <IconButton aria-label="edit" size='small' color='primary' onClick={()=>setOpenDialog(!!!openDialog)}>
                                            <GroupWorkIcon/>
                                        </IconButton>
                                        </Grid>
                                    </Grid>
                                </TableCell>
                                </TableRow>
                            )
                            })}
                        
                            </TableBody>
                        </Table>
            </TableContainer>
            </div>
           </Grid>
        
        {/* // Model */}
            <Dialog
                    open={openDialog}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                <DialogTitle id="alert-dialog-title">Enter Recovery Amount</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <Grid container justifyContent='center'>
                        <Grid item>
                            <InputField  size='small'
                                label="Recovery Amount" 
                                type="number" 
                                fullWidth
                                onChange={FiledChange} 
                                name='RecoveryAmount'
                                value={fields.description}
                                />
                        </Grid>
                    </Grid> 
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="default" >
                        Cancel
                    </Button>
                    <Button onClick={ConfirmDelete} color="secondary" autoFocus>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
}

export default Recovery;

import { Button, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useEffect, useState } from 'react';
import GetTable from '../../components/GetTable';
import CachedIcon from '@material-ui/icons/Cached';
import Selecter from '../../components/Selecter';
import axiosInstance from '../../apisConfig';
import InputField from '../../components/InputField';
import SpineerButton from '../../components/SpineerButton';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
    formRoot: {
      flexGrow: 1,
      '@media only screen and (max-width: 600px)': {
        width:'300px',
        marginLeft:'-10px',
       },
    },
    table:{
        '@media only screen and (max-width: 600px)': {
            marginLeft:'-30px',
        },
    }
}))

const AddParty = () => {
    const initialFields = {
        name:'',
        contact:'',
        opening_Balance:'',
        discount:'0',

    };
    const classes = useStyles();
    const [rows,setRows] = useState([]);
    const [fields,setFields] = useState(initialFields);
    const [isUpdate,setIsUpdate] = useState(false);
    const [choices,setChoices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedObjId, setSelectedObjId] = useState(0);


    async function fetchDiscounts(){
        if (navigator.onLine){
            return await axiosInstance.get('DiscountCategory/')
            .then(res=>{
                let data  = res.data;
                if (data['error'] === true){
                alert(`Error Occures ${data['message']}`);
            }
            else{
                setChoices(data['data']);
                localStorage.removeItem('Discounts');
                localStorage.setItem('Discounts',JSON.stringify(data['data']));
            }
            })
            .catch(error=>{
                alert(`Somethin wrong: ${error}`);
            })
        }
        else{
            setChoices(JSON.parse(localStorage.getItem('Discounts')));
        }
    }

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
                    setRows(parties);
                    localStorage.removeItem('Parties');
                    localStorage.setItem('Parties',JSON.stringify(parties));
                }
            })
            .catch(error=>{
                alert(`Somethin wrong: ${error}`);
            })
        }
        else{
            setRows(JSON.parse(localStorage.getItem('Parties')));
        }
    }

    async function saveParty(){
        if (!isUpdate){
            return await axiosInstance.post('Party/',{...fields})
                .then(res=>{
                    let data  = res.data;
                    if (data['error'] === true){
                        alert(`Error Occures ${data['message']}`);
                        setSuccess(false);
                        setLoading(false);
                    }
                    else{
                        setLoading(false);
                        fetchParties();
                        setFields(initialFields);
                    }
                })
                .catch(error=>{
                    alert(`Somethin wrong: ${error}`);
                    setSuccess(false);
                    setLoading(false);
                })
            }
        else{
            console.log(fields);
            return await axiosInstance.put(`Party/${selectedObjId}/`,{...fields})
                .then(res=>{
                    let data  = res.data;
                    if (data['error'] === true){
                        alert(`Error Occures ${data['message']}`);
                        setSuccess(false);
                        setLoading(false);
                    }
                    else{
                        fetchParties();
                        setFields(initialFields);
                        setLoading(false);
                        setIsUpdate(false);
                    }
                })
                .catch(error=>{
                    alert(`Somethin wrong: ${error}`);
                    setSuccess(false);
                    setLoading(false);
                })
            }
    }

    async function ConfirmDelete(e){
        return await axiosInstance.delete(`Party/${selectedObjId}/`)
        .then(res=>{
            let data  = res.data;
            if (data['error'] === true){
                alert(`Error Occures ${data['message']}`);
            }
            else{
                fetchParties();
                setFields(initialFields);
                setOpenDialog(false);
            }
        })
        .catch(error=>{
            alert(`Somethin wrong: ${error}`);
            setOpenDialog(false);
        })
        
    
    }

    async function GetPartyForUpdate(id = selectedObjId){
        return await axiosInstance.get(`Party/${id}/`)
        .then(res=>{
            let data  = res.data;
            if (data['error'] === true){
                alert(`Error Occures ${data['message']}`);
            }
            else{
                let setData = {
                    name:data.data.name,
                    contact:data.data.contact,
                    opening_Balance:data.data.opening_Balance,
                    discount:data.data.discount.id,
                }
                setFields(setData);
                setIsUpdate(true);
            }
        })
        .catch(error=>{
            alert(`Somethin wrong: ${error}`);
            setSuccess(false);
            setLoading(false);

        })
    }

    const selecterOpen = (event)=>{
        // fetchDiscounts();
        
    }

    const handleButtonClick = () => {
        if (!loading) {
        setSuccess(false);
        setLoading(true);
        saveParty();
        }
    };

    const FiledChange = (event) => {
        setFields({
            ...fields,
            [event.target.name] : event.target.value,
        });
    };

    const onDelete = (event)=>{
        let id  = event.currentTarget.getAttribute('id');
        setSelectedObjId(id);
        setOpenDialog(true);
    }

    const onUpdate = (event)=>{
        let id  = event.currentTarget.getAttribute('id');
        console.log(id);
        setSelectedObjId(id);
        console.log(selectedObjId);
        setIsUpdate(true);
        GetPartyForUpdate(id);
    }

    const handleClose = () => {
        setOpenDialog(false);
    };
    
        
    useEffect(() => {
            fetchParties();
            fetchDiscounts();
        }, []);
    
    return (
        <Grid container spacing={2} className={classes.formRoot}>
            {/* Title */}
            <Grid item xs={11} >     
                <Typography variant="h4" gutterBottom  color='primary'>Add Party</Typography>
            </Grid>
            {/* Left */}
            <Grid item xs={1}>
                <Button onClick={fetchParties}>
                    <CachedIcon ></CachedIcon>
                </Button>     
            </Grid>
            
            <Grid item xs={12} md={3} lg={3}>
                <Grid container item direction='column' spacing={3}>
                    <Grid item xs>
                        <InputField  label='Name' tyep='string' size='small' 
                        name='name' type="string" 
                        required={true} 
                        value={fields.name}
                        onChange={FiledChange}
                        autoFocus
                        />
                    </Grid>
                    <Grid item xs>
                        <InputField  size='small' label="Contact"
                        type="number"
                        name='contact'
                        required={true}
                        value={fields.contact}
                        onChange={FiledChange}
                        />  
                    </Grid>
                    <Grid item xs>
                        <InputField  size='small' label="Opening Balance" 
                        type="number" required={true}
                        onChange={FiledChange} 
                        name='opening_Balance'
                        value={(isUpdate?0:fields.opening_Balance)}
                        disabled={(isUpdate? true:false)}
                        />
                    </Grid>

                    <Grid item xs>
                        <Selecter
                        title={fields.discount}
                        handleChange={FiledChange}
                        value={fields.discount}
                        onOpen={selecterOpen}
                        choises={choices}
                        name='discount'
                        />
                    </Grid>

                    <Grid item container  >
                        <SpineerButton
                        handleButtonClick={handleButtonClick} 
                        label={(isUpdate?'Update':'Save')}
                        loading={loading}
                        success={success}
                        size="large"
                        startIcon={(isUpdate? <EditIcon/>:<AddBoxOutlinedIcon />)}
                        />
                    </Grid>
                </Grid>
            </Grid>
            {/* Right */}
            <Grid item xs={12} md={9} lg={9} className={classes.table}>
                <GetTable 
                    rows={rows} 
                    columns={['ID','Name','Contact','Discounted Amount','Opening Balance']}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                />
            </Grid>
        
        {/* // Model */}
            <Dialog
                    open={openDialog}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure want to Delete {selectedObjId}
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="default" >
                        No
                    </Button>
                    <Button onClick={ConfirmDelete} color="secondary" autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>

    );
}

export default AddParty;

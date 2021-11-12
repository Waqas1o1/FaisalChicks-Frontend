import { Button, Grid, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import GetTable from '../../components/GetTable';
import CachedIcon from '@material-ui/icons/Cached';
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
import { makeStyles } from '@material-ui/styles';
import { toast } from 'react-toastify';
const useStyles = makeStyles((theme) => ({
    root:{
        marginRight:theme.spacing(-8)
    },
    
}))


const AddPartyDiscount = () => {
    const classes = useStyles();
    const initialFields = {
        name:'',
       discount:'0'
    };
    const [rows,setRows] = useState([]);
    const [fields,setFields] = useState(initialFields);
    const [isUpdate,setIsUpdate] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedObjId, setSelectedObjId] = useState(0);


    async function fetchDiscounts(){
        if (navigator.onLine){
            return await axiosInstance.get('apis/DiscountCategory/')
            .then(res=>{
                let data  = res.data;
                if (data['error'] === true){
                alert(`Error Occures ${data['message']}`);
                }
                else{
                    let discounts = data['data'];
                    setRows(discounts);
                }
            })
            .catch(error=>{
                alert(`Somethin wrong: ${error}`);
            })
        }
       
    }


    async function saveDiscount(){
        if (!isUpdate){
            return await axiosInstance.post('apis/DiscountCategory/',{...fields})
                .then(res=>{
                    let data  = res.data;
                    if (data['error'] === true){
                        for (let err in data['message']){    
                            toast.error(data['message'][err]);
                        }
                        setSuccess(false);
                        setLoading(false);
                    }
                    else{
                        setLoading(false);
                        fetchDiscounts();
                        setFields(initialFields);
                        toast.success(data['message']);
                    }
                })
                .catch(error=>{
                    toast.error(`Somethin wrong: ${error}`);
                    setSuccess(false);
                    setLoading(false);
                })
            }
        else{
            console.log(fields);
            return await axiosInstance.put(`apis/DiscountCategory/${selectedObjId}/`,{...fields})
                .then(res=>{
                    let data  = res.data;
                    if (data['error'] === true){
                        for (let err in data['message']){    
                            toast.error(data['message'][err]);
                        }
                        setSuccess(false);
                        setLoading(false);
                    }
                    else{
                        fetchDiscounts();
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
        return await axiosInstance.delete(`apis/DiscountCategory/${selectedObjId}/`)
        .then(res=>{
            let data  = res.data;
            if (data['error'] === true){
                toast.error(`Error Occures ${data['message']}`);
            }
            else{
                toast.info(data['message']);
                fetchDiscounts();
                setFields(initialFields);
                setOpenDialog(false);
            }
        })
        .catch(error=>{
            toast.error(`Somethin wrong: ${error}`);
            setOpenDialog(false);
        })
        
    
    }

    async function GetDiscountForUpdate(id){
        return await axiosInstance.get(`apis/DiscountCategory/${id}/`)
        .then(res=>{
            let data  = res.data;
            if (data['error'] === true){
                toast.error(`Error Occures ${data['message']}`);
            }
            else{
                let setData = {
                    name:data.data.name,
                    discount:data.data.discount,
                }
                setFields(setData);
                setIsUpdate(true);
            }
        })
        .catch(error=>{
            toast.error(`Somethin wrong: ${error}`);
            setSuccess(false);
            setLoading(false);

        })
    }

    const handleButtonClick = (e) => {
        e.preventDefault();
        if (!loading) {
        setSuccess(false);
        setLoading(true);
        saveDiscount();
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
        setSelectedObjId(id);
        setIsUpdate(true);
        GetDiscountForUpdate(id);
    }

    const handleClose = () => {
        setOpenDialog(false);
    };
    
        
    useEffect(() => {
            fetchDiscounts();
        }, []);
    
    return (
        <Grid container spacing={2} className={classes.root}>
            {/* Title */}
            <Grid item xs={10}>     
                <Typography variant="h4" gutterBottom  color='primary'>Add Discount Category</Typography>
            </Grid>
            {/* Left */}
            <Grid item xs={2}>
                <Button onClick={fetchDiscounts}>
                    <CachedIcon ></CachedIcon>
                </Button>     
            </Grid>
            
            <Grid item xs={12} md={2}>
            <form onSubmit={handleButtonClick}style={{display:'contents'}}>
                <Grid container item direction='column' spacing={3}>
                    <Grid item xs>
                        <InputField  label='Name' type='string' size='small' 
                            name='name'
                            value={fields.name}
                            onChange={FiledChange}
                            required={true}
                            inputProps={{ style: {textTransform: "uppercase" }}}
                        />
                    </Grid>
            

                    <Grid item xs>
                        <InputField  label='Discount (%)' 
                        type='number' 
                        size='small' 
                        name='discount'   
                        required={true}
                        value={fields.discount}
                        onChange={FiledChange}
                        />
                    </Grid>

                    <Grid item container  >
                        <SpineerButton
                        type="submit" 
                        label={(isUpdate?'Update':'Save')}
                        loading={loading}
                        success={success}
                        size="large"
                        startIcon={(isUpdate? <EditIcon/>:<AddBoxOutlinedIcon />)}
                        />
                    </Grid>
                </Grid>
            </form>
           </Grid>
            {/* Right */}
           <Grid item xs={12} md={10} >
                <GetTable 
                    rows={rows} 
                    columns={['ID','Name','Discount(%)']}
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

export default AddPartyDiscount;

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
import { toast } from 'react-toastify';


const AddCategory = () => {
    const initialFields = {
        name:''
    };
    const [rows,setRows] = useState([]);
    const [fields,setFields] = useState(initialFields);
    const [isUpdate,setIsUpdate] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedObjId, setSelectedObjId] = useState(0);


    async function fetchCategory(){
        if (navigator.onLine){
            return await axiosInstance.get('apis/Category/')
            .then(res=>{
                let data  = res.data;
                if (data['error'] === true){
                toast.error(`Error Occures ${data['message']}`);
                }
                else{
                    let discounts = data['data'];
                    for (var i in discounts){
                        delete discounts[i].date
                    }
                    setRows(discounts);
                }
            })
            .catch(error=>{
                toast.error(`Somethin wrong: ${error}`);
            })
        }
        else{
            // setChoices(JSON.parse(localStorage.getItem('Discounts')));
        }
    }


    async function saveCategory(){
        if (!isUpdate){
            return await axiosInstance.post('apis/Category/',{...fields})
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
                        fetchCategory();
                        setFields(initialFields);
                        toast.success(data['message']);
                    }
                })
                .catch(error=>{
                    toast.error(error);
                    setSuccess(false);
                    setLoading(false);
                })
            }
        else{
            return await axiosInstance.put(`apis/Category/${selectedObjId}/`,{...fields})
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
                        toast.success(data['message']);
                        fetchCategory();
                        setFields(initialFields);
                        setLoading(false);
                        setIsUpdate(false);
                    }
                })
                .catch(error=>{
                    toast.error(`Somethin wrong: ${error}`);
                    setSuccess(false);
                    setLoading(false);
                })
            }
    }

    async function ConfirmDelete(e){
        return await axiosInstance.delete(`apis/Category/${selectedObjId}/`)
        .then(res=>{
            let data  = res.data;
            if (data['error'] === true){
                toast.error(`Error Occures ${data['message']}`);
            }
            else{
                toast.info(data['message']);
                fetchCategory();
                setFields(initialFields);
                setOpenDialog(false);
            }
        })
        .catch(error=>{
            toast.error(`Somethin wrong: ${error}`);
            setOpenDialog(false);
        })
        
    
    }

    async function GetCategoryForUpdate(id){
        return await axiosInstance.get(`apis/Category/${id}/`)
        .then(res=>{
            let data  = res.data;
            if (data['error'] === true){
                toast.error(`Error Occures ${data['message']}`);
            }
            else{
                let setData = {
                    name:data.data.name,
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
        saveCategory();
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
        GetCategoryForUpdate(id);
    }

    const handleClose = () => {
        setOpenDialog(false);
    };
    
        
    useEffect(() => {
            fetchCategory();
        }, []);
    
    return (
        <Grid container spacing={2}>
            {/* Title */}
            <Grid item xs={10} >     
                <Typography variant="h4" gutterBottom  color='primary'>Add Product Category</Typography>
            </Grid>
            {/* Left */}
            <Grid item xs={2}>
                <Button onClick={fetchCategory}>
                    <CachedIcon ></CachedIcon>
                </Button>     
            </Grid>
            
            <Grid item xs={12} md={3} >
                <form onSubmit={handleButtonClick}style={{display:'contents'}}>
                    <Grid container item direction='column' spacing={3}>
                        <Grid item xs>
                            <InputField  label='Name' type='string' size='small' 
                                name='name'
                                value={fields.name}
                                required={true}
                                onChange={FiledChange}
                                inputProps={{ style: {textTransform: "uppercase" }}}
                            />
                        </Grid>
                        
                        <Grid item container  >
                            <SpineerButton
                            label={(isUpdate?'Update':'Save')}
                            loading={loading}
                            success={success}
                            type='submit'
                            size="large"
                            startIcon={(isUpdate? <EditIcon/>:<AddBoxOutlinedIcon />)}
                            />
                        </Grid>
                    </Grid>
                </form>
           </Grid>
            {/* Right */}
           <Grid item xs={12} md={9}  >
                <GetTable 
                    rows={rows} 
                    columns={['ID','Name']}
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

export default AddCategory;

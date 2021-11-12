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
import { toast } from 'react-toastify';


const useStyles = makeStyles((theme) => ({
    upperCase:{
        textTransform : 'uppercase'
    },
    table:{
        width:'200px',
        '@media only screen and (max-width: 600px)': {
            width:'100px',
        },
    }
}))

const AddParty = () => {
    const initialFields = {
        name:'',
        email:'',
        creditLimit:'',
        salesTarget:'',
        area:'',
        zone:'',
        region:'',
        contact:'',
        opening_Balance:'',
        discount:'0',
        sale_officer:'',
        TOR:'',
        SCI:'',
        category:'',
        ref_id:'',
     
    };
    const classes = useStyles();
    const [rows,setRows] = useState([]);
    const [fields,setFields] = useState(initialFields);
    const [isUpdate,setIsUpdate] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [discountTitle, setDiscountTitle] = useState('Discount');
    const [discount, setDiscount] = useState([]);
    const [categoryTitle, setCategoryTitle] = useState('Category');
    const [category, setCategory] = useState([]);
    const [salesOfficer, setSalesOfficers] = useState([]);
    const [salesOfficerTitle, setSalesOfficersTitle] = useState('S-Officer');
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
                setDiscount(data['data']);
                localStorage.removeItem('Discounts');
                localStorage.setItem('Discounts',JSON.stringify(data['data']));
            }
            })
            .catch(error=>{
                alert(`Somethin wrong: ${error}`);
            })
        }
        else{
            setDiscount(JSON.parse(localStorage.getItem('Discounts')));
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
                    setSalesOfficers(d);
                    localStorage.removeItem('SalesOfficer');
                    localStorage.setItem('SalesOfficer',JSON.stringify(d));
                }
            })
            .catch(error=>{
                alert(`Somethin wrong: ${error}`);
            })
        }
        else{
            setSalesOfficers(JSON.parse(localStorage.getItem('SalesOfficer')));
        }
    }
    
    async function fetchCategory(){
        if (navigator.onLine){
            return await axiosInstance.get('apis/Category/')
            .then(res=>{
                let data  = res.data;
                if (data['error'] === true){
                alert(`Error Occures ${data['message']}`);
            }
            else{
                setCategory(data['data']);
                localStorage.removeItem('Category');
                localStorage.setItem('Category',JSON.stringify(data['data']));
            }
            })
            .catch(error=>{
                alert(`Somethin wrong: ${error}`);
            })
        }
        else{
            setCategory(JSON.parse(localStorage.getItem('Category')));
        }
    }
    

    async function fetchParties(){
        if (navigator.onLine){
            return await axiosInstance.get('apis/Party/')
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
                        parties[p].category = parties[p].category.name 
                        parties[p].sale_officer = parties[p].sale_officer.name 
                    }
                    setRows(parties);
                    // SetPartieseDB(parties);
                    // console.log(GetPartieseDB());
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

    function Reset(){
        setCategoryTitle('Select Catagory');
        setDiscountTitle('Select Discount');
        setSalesOfficersTitle('Select SalesOfficer');
        setFields(initialFields);
        setLoading(false);
        setSuccess(false);
        fetchParties();
        setIsUpdate(false);
    }

    async function saveParty(){
        if (!isUpdate){
            let form_data = new FormData();
            for (let i in fields){
                form_data.append(i, fields[i]);
            };
            return await axiosInstance.post('apis/Party/',form_data,
            {headers: {
                'content-type': 'multipart/form-data',
                'Authorization': `Token ${localStorage.getItem('token')}`
              }})
                .then(res=>{
                    let data  = res.data;
                    if (data['error'] === true){
                        for (let err in data['message']){
                            toast.error(data['message'][err]);
                        }
                        setLoading(false);
                    }
                    else{
                        toast.success(data['message'])
                        Reset();
                    }
                })
                .catch(error=>{
                    toast.error(`Somethin wrong: ${error}`);
                    setLoading(false);
                    Reset();
                })
            }
        else{
            let form_data = new FormData();
            for (let i in fields){
                if (i === 'sales_Officer' || i === 'SCI' || i === 'TOR'){
                    
                }
                else{
                    form_data.append(i, fields[i]);
                }
            }
            return await axiosInstance.put(`apis/Party/${selectedObjId}/`,form_data)
                .then(res=>{
                    let data  = res.data;
                    if (data['error'] === true){
                        for (let i in fields){
                            form_data.append(i, fields[i]);
                        };
                        Reset();
                    }
                    else{
                        Reset();
                    }
                })
                .catch(error=>{
                    toast.error(`Somethin wrong: ${error}`);
                    Reset();
                })
            }
    }

    async function ConfirmDelete(e){
        return await axiosInstance.delete(`apis/Party/${selectedObjId}/`)
        .then(res=>{
            let data  = res.data;
            if (data['error'] === true){
                toast.error(`Error Occures ${data['message']}`);
            }
            else{
                toast.info(data['message']);
                Reset();
                setOpenDialog(false);
            }
        })
        .catch(error=>{
            toast.error(`Somethin wrong: ${error}`);
            setOpenDialog(false);
            Reset();
        })
        
    
    }

    async function GetPartyForUpdate(id = selectedObjId){
        return await axiosInstance.get(`apis/Party/${id}/`)
        .then(res=>{
            let data  = res.data;
            if (data['error'] === true){
                toast.error(`Error Occures ${data['message']}`);
            }
            else{
                let setData = {
                    creditLimit:data.data.creditLimit,
                    salesTarget:data.data.salesTarget,
                    sales_Officer:data.data.sales_Officer,
                    category:data.data.category.id,
                    name:data.data.name,
                    ref_id:data.data.ref_id,
                    email:data.data.email,
                    area:data.data.area,
                    region:data.data.region,
                    zone:data.data.zone,
                    contact:data.data.contact,
                    sale_officer:data.data.sale_officer.id,
                    opening_Balance:data.data.opening_Balance,
                    discount:data.data.discount.id,
                }
                setFields(setData);
                setCategoryTitle(data.data.category.name);
                setSalesOfficersTitle(data.data.sale_officer.name);
                setDiscountTitle(data.data.discount.name);
                setIsUpdate(true);
            }
        })
        .catch(error=>{
            toast.error(`Somethin wrong: ${error}`);
            setSuccess(false);
            setLoading(false);
        })
    }

    const selecterOpen = (event)=>{
        // fetchDiscounts();
        
    }

    const handleButtonClick = (e) => {
        e.preventDefault();
        if (!loading) {
        setSuccess(false);
        setLoading(true);
        saveParty();
        }
    };

    const FiledChange = (event) => {
        if (event.target.name === 'discount'){
            const index = event.target.selectedIndex;
            const optionElement = event.target.childNodes[index];
            const optionElementId = optionElement.getAttribute('id');
            const obj = JSON.parse(optionElementId);
            setDiscountTitle(`${obj.name} : ${obj.discount}`);
        }
        if (event.target.name === 'sale_officer'){
            const index = event.target.selectedIndex;
            const optionElement = event.target.childNodes[index];
            const optionElementId = optionElement.getAttribute('id');
            const obj = JSON.parse(optionElementId);
            setSalesOfficersTitle(obj.name);
        }
        if (event.target.name === 'category'){
            const index = event.target.selectedIndex;
            const optionElement = event.target.childNodes[index];
            const optionElementId = optionElement.getAttribute('id');
            const obj = JSON.parse(optionElementId);
            setCategoryTitle(obj.name);
        }
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
        setIsUpdate(true);
        GetPartyForUpdate(id);
    }

    const handleClose = () => {
        setOpenDialog(false);
    };
    const handleInputChange =(event) => {
        setFields({
            ...fields,
          [event.target.name]: event.target.files[0]
        });
      };
    
        
    useEffect(() => {
            fetchParties();
            fetchDiscounts();
            fetchSalesOfficers();
            fetchCategory();
        }, []);
    
    return (
        <Grid container spacing={2} >
            {/* Title */}
            <Grid item xs={10} >     
                <Typography variant="h4" gutterBottom  color='primary'>Add Party</Typography>
            </Grid>
            {/* Left */}
            <Grid item xs={2} >
                <Button onClick={fetchParties}>
                    <CachedIcon ></CachedIcon>
                </Button>     
            </Grid>
            
            <Grid item xs={12} md={3} >
            <form onSubmit={handleButtonClick}style={{display:'contents'}}>
                <Grid container item direction='column' spacing={3}>
                    <Grid item container spacing={1}>
                        <Grid item xs >
                            <Selecter
                                title={discountTitle}
                                handleChange={FiledChange}
                                required={true}
                                value={fields.discount}
                                onOpen={selecterOpen}
                                choises={discount}
                                name='discount'
                            />
                        </Grid>
                        
                        <Grid item xs >
                            <Selecter
                            title={salesOfficerTitle}
                            required={true}
                            handleChange={FiledChange}
                            value={fields.sale_officer}
                            onOpen={selecterOpen}
                            choises={salesOfficer}
                            name='sale_officer'
                            />
                        </Grid>
                        
                        <Grid item xs >
                            <Selecter
                            title={categoryTitle}
                            required={true}
                            handleChange={FiledChange}
                            value={fields.catagory}
                            onOpen={selecterOpen}
                            choises={category}
                            name='category'
                            />
                        </Grid>
                        
                    </Grid>
                    <Grid item container spacing={3}>
                        <Grid item xs={6}>
                            <InputField  label='Credit Limit' 
                                type='number' size='small' 
                                name='creditLimit'
                                required={true} 
                                value={fields.creditLimit}
                                onChange={FiledChange}
                                />
                        </Grid>
                        <Grid item xs={6}>
                            <InputField  label='Sales Target' 
                                type='number' size='small' 
                                name='salesTarget'
                                required={true} 
                                value={fields.salesTarget}
                                onChange={FiledChange}
                                />
                        </Grid>
                        <Grid item xs={6}>
                            <InputField  label='Reference ID' 
                                type='number' size='small' 
                                name='ref_id'
                                required={true} 
                                value={fields.ref_id}
                                onChange={FiledChange}
                                />
                        </Grid>
                    </Grid>
                    <Grid item container spacing={3}>
                        <Grid item xs={6}>
                            <InputField  label='Name' 
                                type='string' size='small' 
                                name='name'
                                required={true} 
                                value={fields.name}
                                onChange={FiledChange}
                                inputProps={{ style: {textTransform: "uppercase" }}}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <InputField  label='Email' type='email' size='small' 
                                name='email'
                                required={true} 
                                value={fields.email}
                                onChange={FiledChange}
                            />
                        </Grid>
                    </Grid>
                    <Grid item container spacing={3}>
                        <Grid xs item>
                            <InputField  label='Area' 
                                type='string' size='small' 
                                name='area'
                                inputProps={{ style: {textTransform: "uppercase" }}}
                                required={true} 
                                value={fields.area}
                                onChange={FiledChange}
                            />
                        </Grid>
                        <Grid xs item>
                            <InputField  label='Region' 
                                type='string' size='small' 
                                inputProps={{ style: {textTransform: "uppercase" }}}
                                name='region'
                                required={true} 
                                value={fields.region}
                                onChange={FiledChange}
                            />
                        </Grid>
                        <Grid xs item>
                            <InputField  label='Zone' 
                                type='string' size='small' 
                                inputProps={{ style: {textTransform: "uppercase" }}}
                                name='zone'
                                required={true} 
                                value={fields.zone}
                                onChange={FiledChange}
                            />
                        </Grid>
                    </Grid>             
                    <Grid item xs>
                        <InputField  size='small' label="Contact"
                        type="string"
                        name='contact'
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
                    
                    <Grid item container spacing={3}>
                        <Grid item xs={6}>
                            <Typography variant='body2'>Security Check Image</Typography>
                            <input type="file" disabled={(isUpdate?true:false)} name='SCI' onChange={handleInputChange}/>
                        </Grid>
                        <Grid item xs={6}>
                        <Typography variant='body2'>Terms Of Service Image</Typography>
                            <input type="file"  disabled={(isUpdate?true:false)} name='TOR' onChange={handleInputChange}/>
                        </Grid>
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
            <Grid item xs={12} md={9} className={classes.table}>
                <GetTable 
                    rows={rows} 
                    columns={['ID','Ref Id','Name','Email','Area','Zone','Region','Contact','Credit Limit','Sales Target','Opening Balance','SCI','TOR','Discount','Sales Officer','Category']}
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
                <DialogTitle id="alert-dialog-title">{"Are you Sure?"}</DialogTitle>
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

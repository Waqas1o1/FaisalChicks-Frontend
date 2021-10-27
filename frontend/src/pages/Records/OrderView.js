import React, {useEffect, useState} from 'react';
import { DataGrid } from '@material-ui/data-grid';
import axiosInstance from '../../apisConfig';
import { makeStyles } from '@material-ui/styles';
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import AddAlarmOutlinedIcon from '@material-ui/icons/AddAlarmOutlined';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import InputField from '../../components/InputField';
import ChipInput from 'material-ui-chip-input';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import EditIcon from '@material-ui/icons/Edit';
import Selecter from '../../components/Selecter';
import DeleteIcon from '@material-ui/icons/Delete';
import { connect } from 'react-redux';
import GroupStatus from '../../utils/status';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AutoSuggestField from '../../components/AutoSuggestField';

const useStyles = makeStyles(theme => ({
    table: {
        marginTop: theme.spacing(3),
        '& .MuiDataGrid-columnHeader': {
            backgroundColor: theme.palette.primary.dark,
            cursor: 'pointer',
        },
    },
}))




function DataTable(props) {
  const initialFields = {
    driver:'',
    vehical_no:'',
    cell_no:'',
    bulty_no:'',
    gate_pass:'',
    party_order:'',
    freight:'',
    locations:[],

  };
  const initialEditFields = {
    party :'',
    sale_officer   :'',
    description  :'',
    freight  :'',
    total_amount  :'',
  };

  const initialdispcthFields = {
    driver :'',
    freight :'',
    vehical_no :'',
    cell_no : '',
    bulty_no : '',
    gate_pass :'',
    locations :'',
  }

  const [rows,setRows] = useState([]);
  const [fields,setFields] = useState(initialFields);
  const [editFields,setEditFields] = useState(initialEditFields);
  // Dispatch
  const [dispatchFields,setDispatchFields] = useState(initialdispcthFields);
  const [selecteddispatch,setSelectedDispatch] = useState(null);
  const [openDispatchDialog, setOpenDispatchDialog] = useState(false);
  const [openEditDialog, setEditDialog] = useState(false);
  // party Order    
  const [openDialog3, setOpenDialog3] = useState(false);
  const [selectedPartyOrder, setSelectedPartyOrder] = useState(0);
  const [confirmOrderOpenDialog,setConfirmOrderOpenDialog] = useState(false);
  // party     
  const [partyTitle, setPartyTitle] = useState('');
  const [parties, setParties] = useState([]);
  const [partyDisabled, setPartDisabled] = useState(false);
  // Sales Officer
  const [salesOfficer,setSalesOfficer] = useState([]);
  const [salesOfficerTitle,setSalesOfficerTitle] = useState('Sales Officer');
  const [salesOfficerDisabled,setSalesOfficerDisabled] = useState(false);
  // Products
  const [products,setProducts] = useState([]);
  const [prodcutsFetched,setProdcutsFetched] = useState([]);
  const initialProductFields = {
    qty:'',
    rate:'',
    product:'',
    party_order:'',
  }
  const [productsFields,setProductsFields] = useState(initialProductFields);
  const [selectedProduct,setSelectedProduct] = useState(initialProductFields); 
  const [confirmProductAdd,setConfirmProductAdd] = useState(false); 


  const [loading,setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialog2, setOpenDialog2] = useState(false);
  const [selectedObjId, setSelectedObjId] = useState(0);
  const [locations, setLocaions] = useState([]);

  
  const classes = useStyles();
  
  const FieldsCahange = (e) =>{
    setEditFields({
      ...editFields,
      [e.target.name]: e.target.value
    })
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
                  }
                  setParties(parties);
              }
          })
          .catch(error=>{
              alert(`Somethin wrong: ${error}`);
          })
      }
    
  }

  async function fetchReliventPartyOrders(id){
    if (navigator.onLine){
        return await axiosInstance.get(`apis/PartyOrder/${id}`)
        .then(res=>{
            let data  = res.data;
            if (data['error'] === true){
                alert(`Error Occures ${data['message']}`);
            }
            else{
                let partyorder = data['data'];
                    setPartyTitle(partyorder.party.name);
                    setSalesOfficerTitle(partyorder.sale_officer.name);
                    setEditFields({
                      party:partyorder.party.id,
                      sale_officer:partyorder.sale_officer.id,
                      description:partyorder.description,
                      freight:partyorder.freight,
                      region:partyorder.region,
                      contact:partyorder.contact,
                      salesTarget:partyorder.salesTarget,
                      total_amount:partyorder.total_amount,
                    });
                    if (partyorder.status !== 'Pending'){
                        setPartDisabled(true);
                        setSalesOfficerDisabled(true);
                    }
                    setProducts(partyorder.products);
            }
        })
        .catch(error=>{
            alert(`Somethin wrong: ${error}`);
        })
    }
   
  }

  async function ConfirmOrderDelete(){
    if (navigator.onLine){
        return await axiosInstance.delete(`apis/PartyOrder/${selectedPartyOrder}/`)
        .then(res=>{
            let data  = res.data;
            if (data['error'] === true){
                alert(`Error Occures ${data['message']}`);
            }
            else{
                fetchOrders();
                setConfirmOrderOpenDialog(false);
            }
        })
        .catch(error=>{
            alert(`Somethin wrong: ${error}`);
        })
    }
   
  }
  async function UpdatePartyOrder(){
    if (navigator.onLine){
      let send_dict = {
        ...editFields,
        'products':products
      }
        return await axiosInstance.put(`apis/PartyOrder/${selectedPartyOrder}/`,{...send_dict})
        .then(res=>{
            let data  = res.data;
            if (data['error'] === true){
                alert(`Error Occures ${data['message']}`);
                setLoading(false);
                setConfirmProductAdd(false);
            }
            else{
              fetchOrders();
              setEditDialog(false);
              setProducts([]);
              setConfirmProductAdd(false);
            }
          })
          .catch(error=>{
            alert(`Somethin wrong: ${error}`);
            setLoading(false);
            setConfirmProductAdd(false);
        })
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
            }
        })
        .catch(error=>{
            alert(`Somethin wrong: ${error}`);
        })
    }
  
  }


  async function ConfirmChange(){
    setLoading(true);
    return await axiosInstance.get(`apis/ChangePartyOrderStatus/${selectedObjId}/`)
    .then(res=>{
        let data  = res.data;
        if (data['error'] === true){
            alert(`Error Occures ${data['message']}`);
            setLoading(false);
        }
        else{
            fetchOrders();
            setLoading(false);
            setOpenDialog(false);
        }
    })
    .catch(error=>{
        alert(`Somethin wrong: ${error}`);
        setOpenDialog(false);
        setLoading(false);
        setOpenDialog(false);
    })
  }

  function ChangeStatus(e){
    let id  = e.currentTarget.getAttribute('id');
    setSelectedObjId(id);
    setOpenDialog(true);
  }
  function GenrateDispatch(e,row){
    let id  = e.currentTarget.getAttribute('id');
    setSelectedObjId(id);
    setFields({
      ...fields,
      party_order:id,
      freight:row.row.freight
    })
    setOpenDialog2(true);
  }

  const FiledChange = (event) => {
    if (event.target.name === 'party'){
      const index = event.target.selectedIndex;
      const optionElement = event.target.childNodes[index];
      const optionElementId = optionElement.getAttribute('id');
      const obj = JSON.parse(optionElementId);
      setPartyTitle(obj.name);
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
  const handleProductFieldChange = (e)=>{
    setProductsFields({
      ...productsFields,
      [e.target.name] : e.target.value
    })
  };
  const productValueChange = (_,value)=>{
    if (value !== null){
      setSelectedProduct(value);
      setProductsFields({
        ...productsFields,
        product: value.id
      })
    }
  }
  const ProductfieldChange =(e) =>{
    setProductsFields({
      ...productsFields,
      rate:selectedProduct.sales_price,
    })
  }
  async function fetchParoducts(){
    if (navigator.onLine){
        return await axiosInstance.get('apis/Product/')
        .then(res=>{
            let data  = res.data;
            if (data['error'] === true){
                alert(`Error Occures ${data['message']}`);
            }
            else{
                let pdts = data['data'];
                setProdcutsFetched(pdts);
            }
        })
        .catch(error=>{
            alert(`Somethin wrong: ${error}`);
        })
    }
    
}


  function handleLocationSet(items) {
    let newItem = items.replace(/"/g, '\'');
    setLocaions([
      ...locations,
      newItem
    ]);
  }
  function handleLocationDelete(name,index) {
    let array = locations.filter(item=>item !== name);
    setLocaions([
      ...array
    ]);
  }

  async function DispatchConfirmed(){
    setLoading(true);
    const send = {...fields,locations:JSON.stringify(locations)};
    setLoading(false);
    await axiosInstance.post('apis/DispatchTable/',send)
      .then(res=>{
        if (res['error'] === true){
            alert(`Error Occures ${res['message']}`);
        }
        else{
            let data  = res.data;
                  if (data['error'] === true){
                      alert(`Error Occures ${data['message']}`);
                      setLoading(false);
                  }
                  else{
                      setLoading(false);
                      fetchOrders();
                      setFields(initialFields);
                      setOpenDialog2(false);
                      setOpenDialog3(false);
                  }
        }
    })
    .catch(error=>{
        alert(`Somethin wrong: ${error}`);
    })
  
  }

  async function fetchOrders(){
      await axiosInstance.get('apis/PartyOrder/')
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
            setRows(d);
            setLoading(false);
        }
    })
    .catch(error=>{
        alert(`Somethin wrong: ${error}`);
    })
  }

  async function GetReleventDispatch(id){
      await axiosInstance.get(`apis/DispatchTable/${id}`)
      .then(res=>{
        if (res['error'] === true){
            alert(`Error Occures ${res['message']}`);
        }
        else{
            var d = res['data']['data'];
            setDispatchFields({
              driver: d.driver,
              freight: d.freight,
              vehical_no: d.vehical_no,
              cell_no: d.cell_no,
              bulty_no: d.bulty_no,
              gate_pass: d.gate_pass,
              locations: d.locations,
            });
            setLocaions(JSON.parse(d.locations));
        }
    })
    .catch(error=>{
        alert(`Somethin wrong: ${error}`);
    })
  }

  async function DispatchUpdate(){
      await axiosInstance.put(`apis/DispatchTable/${selecteddispatch}/`,{...dispatchFields,party_order:selecteddispatch,locations:JSON.stringify(locations)})
      .then(res=>{
        if (res['error'] === true){
            alert(`Error Occures ${res['message']}`);
        }
        else{
            setLoading(false);
            setDispatchFields(initialdispcthFields);
            setOpenDispatchDialog(false);
        }
    })
    .catch(error=>{
      setLoading(false);
      setDispatchFields(initialdispcthFields);
      setOpenDispatchDialog(false);
      alert(`Somethin wrong: ${error}`);
    })
  }

  const EditDispatchFields =(e)=>{
        setDispatchFields({
          ...dispatchFields,
          [e.target.name]: e.target.value
        })
  }
  
  const ViewDispatchFields=(id)=>{
    setOpenDispatchDialog(true);
    setSelectedDispatch(id);
    GetReleventDispatch(id);
  }
  const openEditBox=(id)=>{
    fetchParoducts();
    setProductsFields({
      ...productsFields,
      party_order: id
    });
    setEditDialog(true);
    setSelectedPartyOrder(id);
    fetchReliventPartyOrders(id);
  }
  const EditPartyOrder=()=>{
    setLoading(true);
    UpdatePartyOrder();
  }
  const DeletePartyOrders=(id)=>{
    setSelectedPartyOrder(id);
    setConfirmOrderOpenDialog(true)
  }
  const EditProduct = (e)=>{
    let pdt  = JSON.parse(e.target.id);
    if (e.target.name === 'qty'){
      pdt.qty = e.target.value;
    }
    if (e.target.name === 'rate'){
      pdt.rate = e.target.value;
    }
    let pdts = products.filter(p=>p.id!==pdt.id);
    setProducts([
      ...pdts,
      pdt
    ]);
  }
  const DeleteProduct = (id)=>{
    let pdts = products.filter(p=>p.id!==id);
    if (pdts.length !== 0){
      setProducts(pdts);
    }
  }
  const AddProduct = async () =>{
    productsFields.product = {name:selectedProduct.name}
    setProducts([
      ...products,
      productsFields
    ]);
    setSelectedProduct([]);
    setProductsFields(initialProductFields);
    setConfirmProductAdd(false);
  }
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'sale_officer',
      headerName: 'Sales Officer',
      width: 200,
      editable: false,
    },
    {
      field: 'party',
      headerName: 'Party',
      width: 200,
      editable: false,
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 190,
      editable: false,
    },
    {
      field: 'gross_total',
      headerName: 'Gross Total',
      type: 'number',
      width: 150,
      editable: false,
    },
    {
      field: 'discounted_amount',
      headerName: 'Discount',
      type: 'number',
      width: 170,
      editable: false,
    },
    {
      field: 'freight',
      headerName: 'Freight',
      type: 'number',
      width: 150,
      editable: false,
    },
   
    {
      field: 'pdt_qty__sum',
      headerName: 'Products Total',
      type: 'number',
      width: 170,
      editable: false,
    },
    {
      field: 'pandding_amount',
      headerName: 'Pending Amount',
      type: 'number',
      width: 180,
      editable: false,
    },
    {
      field: 'total_amount',
      headerName: 'Total Amount',
      type: 'number',
      width: 170,
      editable: false,
    },
    {
      field: 'dispatch',
      headerName: 'View Dispatched',
      width: 190,
      editable: false,
      renderCell: (row)=>{
        if (row.row.status === 'Delivered' && props.group !== GroupStatus.SALESOFFICER){
          return  <IconButton onClick={()=>ViewDispatchFields(row.row.id)}>
                    <VisibilityOutlinedIcon color='primary'/>
                  </IconButton>
        }
        else{
          return <IconButton disabled><VisibilityOutlinedIcon/></IconButton>
        }
      }
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      editable: false,
      renderCell: (row)=>{
        if (row.row.status === 'Pending'){
          return <span style={{color:'red'}}>
                  {row.row.status}
                  </span>
        }
        else if (row.row.status === 'Delivered'){
          return <span style={{color:'green'}}>
                    <b>{row.row.status}</b>
                  </span>
        }
        else{
          return <span style={{color:'green'}}>
                      {row.row.status}
                  </span>
        }
      }
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      headerAlign: 'center',
      editable: false,
      renderCell: (row)=>{
        if (row.row.status === 'Pending')
        return (
          <>
          {props.group === GroupStatus.SALESOFFICER?undefined:
          <Button aria-label="delete" color="secondary" onClick={ChangeStatus} size='small' id={row.row.id}>
            <AddAlarmOutlinedIcon />
          </Button>
          }
          {props.group === GroupStatus.DISPATCHER?undefined:
          <IconButton  onClick={()=>{DeletePartyOrders(row.row.id)}}>
            <DeleteIcon color='primary'/>
          </IconButton>
          }
          <IconButton  onClick={()=>{openEditBox(row.row.id)}}>
            <EditIcon color='primary'/>
          </IconButton>
          
          </>
        )
        if (row.row.status === 'Delivered'){
          return (
          <>
          {props.group === GroupStatus.SALESOFFICER?undefined:
            <Button aria-label="delete" color="primary"  size='small' id={row.row.id}>
              <LocalShippingIcon />
            </Button>
          }
          {props.group === GroupStatus.SALESOFFICER || props.group === GroupStatus.DISPATCHER?undefined:
            <IconButton onClick={()=>{DeletePartyOrders(row.row.id)}}>
              <DeleteIcon color='primary'/>
            </IconButton>
          }
          {props.group === GroupStatus.DISPATCHER?undefined:
            <IconButton onClick={()=>{openEditBox(row.row.id)}}>
              <EditIcon color='primary'/>
            </IconButton>
        }
            </>
          )
        }
        else{
          return (
            <>
              {props.group === GroupStatus.SALESOFFICER?undefined:
              <Button aria-label="delete" color="default" onClick={(e)=>GenrateDispatch(e,row)} size='small' id={row.id}>
                <DoneAllIcon />
              </Button>
              }
              {props.group === GroupStatus.SALESOFFICER?undefined:
              <IconButton onClick={()=>{DeletePartyOrders(row.row.id)}}>
                <DeleteIcon color='primary'/>
              </IconButton>
              }
              {props.group === GroupStatus.DISPATCHER?undefined:
              <IconButton onClick={()=>{openEditBox(row.row.id)}}>
                <EditIcon color='primary'/>
              </IconButton>
            }
            </>
          )
        }
      }
    },
  ];

  useEffect(() => {
      fetchOrders();
  }, [])
  
    return (
       <div style={{ height: 500, width: '100%'}}>
            <DataGrid
              rows={rows}
              columns={columns}
              autoPageSize
              className={classes.table}
              autoHeight
              disableSelectionOnClick
              loading={loading}
            />
            {/* Confirm */}
          <Dialog
              open={openDialog}
              onClose={()=>setOpenDialog(!openDialog)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"Order Confirmation"}</DialogTitle>
              <DialogContent>
              <DialogContentText id="alert-dialog-description">
                  Are you sure you want to confirm the order?
              </DialogContentText>
              </DialogContent>
              <DialogActions>
                  <Button onClick={()=>setOpenDialog(!openDialog)} color="default" >
                      No
                  </Button>
                  <Button onClick={ConfirmChange}  color="secondary" autoFocus>
                  {loading === true? <CircularProgress color="secondary" />:'Confirm'}
                  </Button>
              </DialogActions>
          </Dialog>
          {/* Disatch  */}
          <Dialog
            open={openDialog2}
            onClose={()=>setOpenDialog(!openDialog2)}
            >
              <DialogTitle >{"Dispatch Details"}</DialogTitle>
              <DialogContent>
              <DialogContentText >Dispatch with</DialogContentText>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                      <InputField  label='Driver Name' size='small' 
                        name='driver' type="string"  
                        value={fields.driver}
                        fullWidth
                        onChange={FiledChange}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <InputField  label='Cell No' size='small' 
                        name='cell_no' type="number"  
                        value={fields.cell_no}
                        fullWidth
                        onChange={FiledChange}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <InputField  label='Freight (Default)'  size='small' 
                        name='freight' type="string"  
                        value={fields.freight}
                        fullWidth
                        onChange={FiledChange}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <InputField  label='Bulty #' size='small' 
                        name='bulty_no' type="string"  
                        value={fields.bulty_no}
                        onChange={FiledChange}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <InputField  label='Vehical #' size='small' 
                        name='vehical_no' type="string"  
                        value={fields.vehical_no}
                        onChange={FiledChange}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <InputField  label='Gate Pass' size='small' 
                        name='gate_pass' type="string"  
                        value={fields.gate_pass}
                        onChange={FiledChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                    <ChipInput
                        placeholder='Locations'
                        value={locations}
                        onAdd={(chip) => handleLocationSet(chip)}
                        onDelete={(chip, index) => handleLocationDelete(chip, index)}
                        fullWidth
                        />
                    </Grid>
                    
                </Grid>
              </DialogContent>
              <DialogActions>
                  <Button onClick={()=>{setFields(initialFields);setOpenDialog2(false)}} color="default" >
                      Cancel
                  </Button>
                  <Button onClick={()=>setOpenDialog3(true)}  color="primary" autoFocus>
                      {loading? <CircularProgress color="secondary" />:'Submit'}
                  </Button>
              </DialogActions>
          </Dialog>
         
        {/* Dispatch Confirmation */}
          <Dialog
            open={openDialog3}
            onClose={()=>setOpenDialog(false)}
            >
              <DialogTitle id="alert-dialog-title">{"Order Dispatch"}</DialogTitle>
              <DialogContent>
              <DialogContentText id="alert-dialog-description">
                  Are you sure you want to Dispatch the order?
              </DialogContentText>
              </DialogContent>
              <DialogActions>
                  <Button onClick={()=>setOpenDialog3(false)} color="default" >
                      No
                  </Button>
                  <Button onClick={DispatchConfirmed}   color="secondary" autoFocus>
                  {loading === true? <CircularProgress color="secondary" />:'Confirm'}
                  </Button>
              </DialogActions>
          </Dialog>
        {/* Edit Party Order */}
          <Dialog
              open={openEditDialog}
              onClose={()=>setEditDialog(false)}
              >
              <DialogTitle id="a">{"Order Update"}</DialogTitle>
              <DialogContent>
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs>
                    <Selecter
                        title={partyTitle}
                        disabled={partyDisabled}
                        handleChange={FiledChange}
                        value={editFields.party}
                        onOpen={()=>fetchParties()}
                        choises={parties}
                        name='party'
                        />
                      </Grid>
                    <Grid item xs>
                      <Selecter
                          title={salesOfficerTitle}
                          disabled={salesOfficerDisabled}
                          handleChange={FiledChange}
                          value={fields.sale_officer}
                          onOpen={fetchSalesOfficers}
                          choises={salesOfficer}
                          name='sale_officer'
                          />
                    </Grid>
                  <Grid item>
                    <InputField  size='small'
                        label="freight" 
                        type="string" 
                        onChange={FieldsCahange} 
                        name='freight'
                        value={editFields.freight}
                        />
                  </Grid>
                  <Grid item xs={12}>
                    <InputField  size='medium'
                        fullWidth
                        label="Description *" 
                        type="string" 
                        onChange={FieldsCahange} 
                        name='description'
                        value={editFields.description}
                        />
                  </Grid>
                  {/* Products */}
                    <form action="" style={{display:'block'}} onSubmit={(e)=>{e.preventDefault();setConfirmProductAdd(true)}}>
                      <Grid item container spacing={3} alignItems="center" >
                          <Grid item xs={4}>
                            <AutoSuggestField 
                                options={prodcutsFetched}
                                selectedOption={(option)=>option.name || ""}
                                label={'Select Product'}
                                id={'ProductName'}
                                size={180}
                                value={selectedProduct}
                                valueChange={productValueChange}
                                name='product'
                                required={true}
                                onChange={ProductfieldChange}           
                              />
                            </Grid>
                          <Grid item xs={3}>
                            <InputField  size='small'
                                label="qty" 
                                type="number" 
                                onChange={handleProductFieldChange} 
                                name='qty'
                                value={productsFields.qty}
                                />
                            </Grid>
                          <Grid item xs={3}>
                            <InputField  size='small'
                                label="Rate" 
                                type="number" 
                                onChange={handleProductFieldChange} 
                                name='rate'
                                value={productsFields.rate}
                                />
                          </Grid>
                          <Grid item xs={2}>
                          <IconButton type='submit' >
                            <AddCircleIcon color='primary' style={{ fontSize: 40 }}/>
                            </IconButton>
                          </Grid>      
                      </Grid>
                    </form>
                  <Grid item xs={12}>
                      <TableContainer component={Paper}>
                        <Table className={classes.table} size="small" >
                          <TableHead>
                            <TableRow>
                              <TableCell >Name</TableCell>
                              <TableCell >Quantity</TableCell>
                              <TableCell >Rate</TableCell>
                              <TableCell >Delete</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {products.map((pdt)=>(
                              <TableRow key={pdt.id}>
                                <TableCell >
                                  <InputField  size='small'
                                    label="Name" 
                                    disabled={true}
                                    type="string" 
                                    id={JSON.stringify(pdt)}
                                    onChange={EditProduct} 
                                    name='name'
                                    value={pdt.product.name}
                                    />
                                
                                </TableCell>
                                <TableCell >
                                  <InputField  size='small'
                                    label="qty" 
                                    type="number" 
                                    id={JSON.stringify(pdt)}
                                    onChange={EditProduct} 
                                    name='qty'
                                    value={pdt.qty}
                                    />
                                </TableCell>
                                <TableCell >
                                  <InputField  size='small'
                                    label="rate" 
                                    type="number" 
                                    id={JSON.stringify(pdt)}
                                    onChange={EditProduct} 
                                    name='rate'
                                    value={pdt.rate}
                                    />
                                </TableCell>
                                
                                <TableCell >
                                <IconButton onClick={()=>{DeleteProduct(pdt.id)}}>
                                    <DeleteIcon color='primary'/>
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                            ))}
                          
                          </TableBody>
                        </Table>
                      </TableContainer>
                  </Grid>
                  
                </Grid>
              
              </DialogContent>
              <DialogActions>
                  <Button onClick={()=>setEditDialog(false)} color="default" >
                      No
                  </Button>
                  <Button onClick={()=>{EditPartyOrder()}}  color="secondary">
                  {loading === true? <CircularProgress color="secondary" />:'Update'}
                  </Button>
              </DialogActions>
          </Dialog>
           {/* Product Add Confirm */}
          <Dialog
            open={confirmProductAdd}
            onClose={()=>setConfirmProductAdd(false)}
            >
              <DialogTitle id="alert-dialog-title">{"Add Product ?"}</DialogTitle>
              <DialogContent>
              <DialogContentText id="alert-dialog-description">
                  Are you sure you want to ADD The Product?
              </DialogContentText>
              </DialogContent>
              <DialogActions>
                  <Button onClick={()=>setConfirmProductAdd(false)} color="default" >
                      Cancel
                  </Button>
                  <Button onClick={AddProduct} color="secondary" autoFocus>
                  {loading === true? <CircularProgress color="secondary" />:'Confirm'}
                  </Button>
              </DialogActions>
          </Dialog>
        {/* View Dipatch */}
        <Dialog open={openDispatchDialog} onClose={()=>setOpenDispatchDialog(false)}>
            <DialogTitle id="alert-dialog-title">{"Dispatch"}</DialogTitle>
            <DialogContent>
                <Grid container spacing={3}>
                  <Grid item>
                    <InputField  size='small'
                        label="Driver" 
                        type="string" 
                        onChange={EditDispatchFields} 
                        name='driver'
                        value={dispatchFields.driver}
                        />
                  </Grid>
                  <Grid item>
                    <InputField  size='small'
                        label="Freight" 
                        type="string" 
                        onChange={EditDispatchFields} 
                        name='freight'
                        value={dispatchFields.freight}
                        />
                  </Grid>
                  <Grid item>
                    <InputField  size='small'
                        label="Vehical £" 
                        type="string" 
                        onChange={EditDispatchFields} 
                        name='vehical_no'
                        value={dispatchFields.vehical_no}
                        />
                  </Grid>
                  <Grid item>
                    <InputField  size='small'
                        label="Contact" 
                        type="string" 
                        onChange={EditDispatchFields} 
                        name='cell_no'
                        value={dispatchFields.cell_no}
                        />
                  </Grid>
                  <Grid item>
                    <InputField  size='small'
                        label="Bulty #" 
                        type="string" 
                        onChange={EditDispatchFields} 
                        name='bulty_no'
                        value={dispatchFields.bulty_no}
                        />
                  </Grid>
                  <Grid item>
                    <InputField  size='small'
                        label="Gate Pass" 
                        type="string" 
                        onChange={EditDispatchFields} 
                        name='gate_pass'
                        value={dispatchFields.gate_pass}
                        />
                  </Grid>      
                  <Grid item>
                  <ChipInput
                        placeholder='Locations'
                        value={locations}
                        onAdd={(chip) => handleLocationSet(chip)}
                        onDelete={(chip, index) => handleLocationDelete(chip, index)}
                        fullWidth
                  />
                  
                  </Grid>
                </Grid>
            </DialogContent>
            
            <DialogActions>
                <Button onClick={()=>setOpenDispatchDialog(false)} color="default" >
                    Close
                </Button>
                <Button onClick={DispatchUpdate}   color="secondary" autoFocus>
                {loading === true? <CircularProgress color="secondary" />:'Update'}
                </Button>
            </DialogActions>
        </Dialog>
        {/* Dispatch Confirmation */}
        <Dialog
            open={confirmOrderOpenDialog}
            onClose={()=>setConfirmOrderOpenDialog(false)}
            >
              <DialogTitle id="alert-dialog-title">{"Are You Sure"}</DialogTitle>
              <DialogContent>
              <DialogContentText id="alert-dialog-description">
                  Are you sure you?
              </DialogContentText>
              </DialogContent>
              <DialogActions>
                  <Button onClick={()=>setConfirmOrderOpenDialog(false)} color="default" >
                      No
                  </Button>
                  <Button onClick={ConfirmOrderDelete}   color="secondary" autoFocus>
                  {loading === true? <CircularProgress color="secondary" />:'Confirm'}
                  </Button>
              </DialogActions>
          </Dialog>
      </div>
    )
}

const mapStateToProps = (state) =>{
  return {
      group: state.group
  };
}


export default connect(mapStateToProps,null)(DataTable);
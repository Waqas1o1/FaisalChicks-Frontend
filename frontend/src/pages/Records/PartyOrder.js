import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/styles'
import Paper from '@material-ui/core/Paper';
import { Button, Divider, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextareaAutosize, Typography } from '@material-ui/core';
import Selecter from '../../components/Selecter';
import axiosInstance  from '../../apisConfig';
import InputField from '../../components/InputField';
import AutoSuggestField from '../../components/AutoSuggestField';
import ReceiptIcon from '@material-ui/icons/Receipt';



const useStyles = makeStyles((theme) => ({
  formRoot: {
    flexGrow: 1,
    padding : theme.spacing(2),
  },
  textArea:{
    width: '100%',
    maxWidth:'100%',
    minHeight:'150px',
    maxHeight:'350px',
    border: '1px solid rgba(0, 0, 0, 0.23)',
    borderRadius:'4px',
  },
  gultter:{
    marginBottom:theme.spacing(2),
  },
  white:{
    color:'white'
  },
  bgBlue:{
    backgroundImage: 'linear-gradient(45deg,#1976d2,#64b5f6)',
  },
  table: {
    '& .MuiDataGrid-columnHeader': {
        backgroundColor: theme.palette.primary.dark,
        cursor: 'pointer',
    },
},
}))

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
}))(TableCell);

export default function PartyOrder() {
  const classes = useStyles();
  const initialFields = {
    party:'',
    sale_officer:'',
    description:'',
    freight:'',
    total_amount:'',
  }
  
  const [fields,setFields] = useState(initialFields);   
  // Parties
  const [parties,setParties] = useState([]);   
  const [partyTitle,setPartyTitle] = useState('Select Party');   
  // Sales Officer
  const [salesOfficers,setSalesOfficers] = useState([]); 
  const [salesOfficerTitle,setSalesOfficerTitle] = useState('Select Sales Ofiicer'); 
  // Products
  const initialProductFields = {
    product:'',
    qty:'',
    rate:'',
  }
  const [products,setProducts] = useState([]); 
  const [productsRows,setProductsRows] = useState([]); 
  const [productFields,setProductFields] = useState(initialProductFields); 
  const [selectedProductId,setSelectedProductId] = useState(initialProductFields); 
  // Total CalCulate
  const [totalAmount,setTotalAmount] = useState(fields.total_amount); 
  // Discount
  const [discount,setDiscount] = useState(0);
  // Grand Total
  const [grandTotal,setGrandTotal] = useState(0);
  
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
                localStorage.removeItem('Parties');
                localStorage.setItem('Parties',JSON.stringify(parties));
            }
        })
        .catch(error=>{
            // alert(`Somethin wrong: ${error}`);
        })
    }
    else{
        setParties(JSON.parse(localStorage.getItem('Parties')));
    }
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
                setProducts(pdts);
                localStorage.removeItem('Products');
                localStorage.setItem('Products',JSON.stringify(pdts));
            }
        })
        .catch(error=>{
            alert(`Somethin wrong: ${error}`);
        })
    }
    else{
        setProducts(JSON.parse(localStorage.getItem('Products')));
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
            // alert(`Somethin wrong: ${error}`);
        })
    }
    else{
        setSalesOfficers(JSON.parse(localStorage.getItem('SalesOfficer')));
    }
  }

  const ProductfieldChange = e =>{
    setProductFields({
      ...productFields,
      [e.target.name] : e.target.value
    })
  }

  const handleProductRowSubmit = e =>{
    e.preventDefault();
    const newProductRow = {
      product : productFields.product,
      product_id : selectedProductId,
      qty : productFields.qty,
      rate : productFields.rate,
      total : productFields.qty * productFields.rate
    }
    const newProductsRows = [...productsRows,newProductRow]
    setProductsRows(newProductsRows);
    setProductFields(initialProductFields);
  }

  const FieldsCahange = event => {

  if (event.target.name === 'party'){
      const index = event.target.selectedIndex;
      const optionElement = event.target.childNodes[index];
      const optionElementId = optionElement.getAttribute('id');
      const obj = JSON.parse(optionElementId);
      setPartyTitle(obj.name);
      setDiscount(obj.discount);
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
  }
  const clearProduct = ()=>{
    setProductsRows([]);
  }

  const handleGenrateOrder = async e =>{
    const send_dict = {
      'party_order': fields,
      'products': productsRows
    }
    await axiosInstance.post('apis/GenratePartyOrder/',send_dict)
    .then(res=>{
      let data  = res.data;
      if (data['error'] === true){
          alert(`Error Occures ${data['message']}`);
      }
      else{
          console.log(data);
      }
      })
      .catch(error=>{
          alert(`Somethin wrong: ${error}`);
      })

      clearProduct();
      setFields(initialFields);
      setPartyTitle('Select Party');
      setSalesOfficerTitle('Select Sales Officer');
      setDiscount(0);
  }


  useEffect(() => {
    fetchParties()
    fetchSalesOfficers()
    fetchParoducts()
  }, [])
  // Total Calculater
  useEffect(()=>{
    var count = 0;
    for (let row in productsRows){
      count += productsRows[row].total;
    }
    setTotalAmount(count);
    var grand_total = 0;
    if (discount !== 0){
        grand_total = count - (count /100)* discount
    }
    grand_total = grand_total - fields.freight;
    setGrandTotal(grand_total);
    
    setFields({
      ...fields,
      total_amount : grand_total
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[productsRows, fields.freight])
  
  return (
    <div className={classes.formRoot}>
      <Paper elevation={3}>
        {/* Genrate Order */}
         <Grid container  spacing={2} className={`${classes.formRoot} ${classes.gultter}`}>
           {/* TITLE */}
            <Grid item xs={12}>
              <Typography variant='body2' color='primary'>Genrate Party Order </Typography>
            </Grid>
            {/* Left CONTAINER */}
              <Grid item xs={12} md={8} container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant='button' color='textSecondary'>Party </Typography>       
                  <Selecter
                    title={partyTitle}
                    handleChange={FieldsCahange}
                    value={fields.party}
                    onOpen={()=>console.log('open')}
                    choises={parties}
                    name='party'
                    algin='left'
                        />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant='button' color='textSecondary'>Description </Typography>
                    <br/>       
                    <TextareaAutosize value={fields.description} onChange={FieldsCahange} name='description' placeholder="Enter Order Discription" maxRows={12} className={classes.textArea}/>
                  </Grid>
              </Grid>
            {/* Right CONATINER */}
            <Grid item xs={12} md={4} container spacing={2}>
              <Grid item xs={12}>
                <Typography variant='button' color='textSecondary'>SALES OFFICER </Typography>     
                <Selecter
                      title={salesOfficerTitle}
                      handleChange={FieldsCahange}
                      value={fields.sale_officer}
                      onOpen={()=>console.log('open')}
                      choises={salesOfficers}
                      name='sale_officer'
                  />
              </Grid>
              {/* Total  */}
              <Grid item xs={12} container className={classes.textArea} alignContent='center' >
                <Grid item xs={12}>
                  <InputField  size='small'
                      label="Total Freight" 
                      type="number" 
                      onChange={FieldsCahange} 
                      name='freight'
                      value={productFields.freight}
                      />
                </Grid>
                <Grid item container justifyContent='space-between'>
                  <Typography variant='subtitle2' color='secondary' >Total Amount <b>:</b></Typography>
                  <Typography variant='subtitle2' color='secondary' >{totalAmount}</Typography> 
                </Grid>
                <Grid item container justifyContent='space-between'>
                  <Typography variant='subtitle2'  >Discounted <b>:</b></Typography>
                  <Typography variant='subtitle2'  >{discount}%</Typography> 
                </Grid>
                <Grid item container justifyContent='space-between'>
                  <Typography variant='subtitle2' color='textPrimary' >Grand Total <b>:</b></Typography>
                  <Typography variant='subtitle2' color='textPrimary' >{grandTotal}</Typography> 
                </Grid>
              </Grid>
              <Grid item xs={12}>
                  <Button fullWidth variant="outlined" color="secondary" startIcon={<ReceiptIcon/>} onClick={handleGenrateOrder} >
                    Genrate Order
                  </Button>
                </Grid>
            </Grid>
              
          </Grid>
          <Divider variant="middle" className={classes.gultter}/>
          {/* Add Products */}
          <Grid container  spacing={2}  className={`${classes.formRoot} ${classes.gultter}`} >
              <Grid container justifyContent='space-around' className={classes.bgBlue}>
                <Grid item >
                  <Typography variant='button' className={classes.white} align='center'>Product</Typography>
                </Grid>
                <Grid item >
                  <Typography variant='button' className={classes.white} align='center'>Quantity</Typography>
                </Grid>
                <Grid item >
                  <Typography variant='button' className={classes.white} align='center'>Rate</Typography>
                </Grid>
              </Grid>
              {/* Add Product */}
              <form style={{display:'contents'}} onSubmit={handleProductRowSubmit}>
                <Grid  container justifyContent='space-around' style={{marginTop:'20px'}} spacing={3}>
                    {/* Product */}
                    <Grid item>
                      <AutoSuggestField 
                        options={products}
                        selectedOption={(option)=>{setSelectedProductId(option.id); return (option.name)}}
                        label={'Select Product'}
                        id={'id'}
                        name='product'
                        onChange={ProductfieldChange}           
                        />
                    </Grid>
                    {/* Qty */}
                    <Grid item>
                          <InputField  size='small'
                                label="Qty" 
                                type="number" 
                                onChange={ProductfieldChange} 
                                name='qty'
                                value={productFields.qty}
                                />
                    </Grid>
                    {/* Rate */}
                    <Grid item>
                        <InputField  size='small'
                                label="Rate" 
                                type="number" 
                                onChange={ProductfieldChange} 
                                name='rate'
                                value={productFields.rate}
                                />
                    </Grid>
                    {/* Submit */}
                    <Grid item xs={12}>
                      <Button variant="contained"  type='submit' >
                        Add Product
                      </Button>

                      <Button style={{marginLeft:'20px'}} variant="contained" color='secondary' onClick={clearProduct} >
                        Clear Product
                      </Button>
                    </Grid>
                
                </Grid>
              </form>
          </Grid>
      </Paper>
      {/* Product Table */}
      <Grid container>
         <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Product</StyledTableCell>
                  <StyledTableCell>Quantity</StyledTableCell>
                  <StyledTableCell>Rate</StyledTableCell>
                  <StyledTableCell>Total</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productsRows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell >{row.product}</TableCell>
                    <TableCell >{row.qty}</TableCell>
                    <TableCell >{row.rate}</TableCell>
                    <TableCell >{row.total}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
      </Grid>
    </div>
  )
}

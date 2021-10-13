import React, {useEffect, useState} from 'react';
import { DataGrid } from '@material-ui/data-grid';
import axiosInstance from '../../apisConfig';
import { makeStyles } from '@material-ui/styles';
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from '@material-ui/core';
import AddAlarmOutlinedIcon from '@material-ui/icons/AddAlarmOutlined';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import InputField from '../../components/InputField';
import ChipInput from 'material-ui-chip-input'
const useStyles = makeStyles(theme => ({
    table: {
        marginTop: theme.spacing(3),
        '& .MuiDataGrid-columnHeader': {
            backgroundColor: theme.palette.primary.dark,
            cursor: 'pointer',
        },
    },
}))




export default function DataTable() {
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

    const [rows,setRows] = useState([]);
    const [fields,setFields] = useState(initialFields);
    const [loading,setLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [openDialog2, setOpenDialog2] = useState(false);
    const [openDialog3, setOpenDialog3] = useState(false);
    const [selectedObjId, setSelectedObjId] = useState(0);
    const [locations, setLocaions] = useState([]);
    
    const classes = useStyles();

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
      setFields({
          ...fields,
          [event.target.name] : event.target.value,
      });
  };

  function handleLocationSet(items) {
    let newItem = items.replace(/"/g, '\'');
    setLocaions([
      ...locations,
      newItem
    ])
  }
  function handleLocationDelete(name,index) {
    let array = locations.filter(item=>item !== name);
    setLocaions([
      ...array
    ]);
  }

    async function DispatchConfirmed(){
      setLoading(true);
      await setFields({...fields,locations:JSON.stringify(locations)});
      console.log(fields)
      await axiosInstance.post('apis/DispatchTable/',{...fields})
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
              setLoading(false)
              localStorage.removeItem('partyOrders');
              localStorage.setItem('partyOrders',JSON.stringify(d));
          }
      })
      .catch(error=>{
          alert(`Somethin wrong: ${error}`);
      })
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
        field: 'freight',
        headerName: 'Freight',
        type: 'number',
        width: 200,
        editable: false,
      },
      {
        field: 'discounted_amount',
        headerName: 'Discounted Amount',
        type: 'number',
        width: 170,
        editable: false,
      },
      {
        field: 'pandding_amount',
        headerName: 'Pandding Amount',
        type: 'number',
        width: 150,
        editable: false,
      },
      {
        field: 'total_amount',
        headerName: 'Total Amount',
        type: 'number',
        width: 150,
        editable: false,
      },
      {
        field: 'status',
        headerName: 'Status',
        width: 120,
        editable: false,
        renderCell: (row)=>{
          if (row.row.status === 'Pending'){
            return <span style={{color:'red'}}>{row.row.status}</span>
          }
          else if (row.row.status === 'Delivered'){
            return <span style={{color:'green'}}><b>{row.row.status}</b></span>
          }
          else{
            return <span style={{color:'green'}}>{row.row.status}</span>
          }
        }
      },
      {
        field: 'action',
        headerName: 'Action',
        
        width: 150,
        sortable: false,
        editable: false,
        renderCell: (row)=>{
          if (row.row.status === 'Pending')
          return (
            <Button aria-label="delete" color="secondary" onClick={ChangeStatus} size='small' id={row.id}>
              <AddAlarmOutlinedIcon />
            </Button>
          )
          if (row.row.status === 'Delivered'){
            return (
              <Button aria-label="delete" color="primary"  size='small' id={row.id}>
                <LocalShippingIcon />
              </Button>
            )
          }
          else{
            return (
              <Button aria-label="delete" color="default" onClick={(e)=>GenrateDispatch(e,row)} size='small' id={row.id}>
                <DoneAllIcon />
              </Button>
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
                pageSize={7}
                className={classes.table}
                headerHeight={60}
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
              <DialogTitle id="alert-dialog-title">{"Order Confirmation"}</DialogTitle>
              <DialogContent>
              <DialogContentText id="alert-dialog-description">
                  Are you sure you want to confirm the order?
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

      
      </div>
  );
}

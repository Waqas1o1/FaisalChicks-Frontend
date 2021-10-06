import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import axiosInstance from '../../apisConfig';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    table: {
        marginTop: theme.spacing(3),
        '& .MuiDataGrid-columnHeader': {
            backgroundColor: theme.palette.primary.dark,
            cursor: 'pointer',
        },
    },
}))

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
  },
  
];



export default function DataTable() {
    const [rows,setRows] = React.useState([]);
    const [loading,setLoading] = React.useState(true);
    const classes = useStyles();

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
              console.log(d);
              localStorage.removeItem('partyOrders');
              localStorage.setItem('partyOrders',JSON.stringify(d));
          }
      })
      .catch(error=>{
          alert(`Somethin wrong: ${error}`);
      })
    }
    React.useEffect(() => {
        fetchOrders()
    }, [])
  
    return (
        <div style={{ height: 500, width: '100%'}}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                className={classes.table}
                headerHeight={60}
                disableSelectionOnClick
                loading={loading}
            />
        </div>
  );
}

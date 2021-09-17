import { Grid, makeStyles } from '@material-ui/core'
import React,{useState} from 'react'
import axiosInstance from '../../apisConfig';
import InputField from '../../components/InputField';
import Selecter from '../../components/Selecter';

const useStyles = makeStyles((theme) => ({
    formRoot: {
      flexGrow: 1,
      padding : theme.spacing(2),
    },
}))

export default function ParryOrder() {
    const initialFields = {
        party:'Select Barty',
        sale_officer:'Select SalesOfficer',
        category:'Select Catagory',
        product:'Select Product',
        description:'',
        freight:'',
        qty:'',
        rate:'',
    }
    const classes = useStyles();
    const [parties,setParties] = useState([]);
    const [salesofficers,setSalesofficers] = useState([]);
    const [fields,setFields] = useState(initialFields);
    

    async function fetchParties(){
        if (navigator.onLine){
            return await axiosInstance.get('Party/')
            .then(res=>{
                let data  = res.data;
                if (data['error'] === true){
                    alert(`Error Occures ${data['message']}`);
                }
                else{
                    let ps = data['data'];
                    for (let p in ps){
                        parties[p].discount = parties[p].discount.discount;
                        delete parties[p].date
                        delete parties[p].current_Balance
                    }
                    setParties(ps);
                    localStorage.removeItem('Parties');
                    localStorage.setItem('Parties',JSON.stringify(ps));
                }
            })
            .catch(error=>{
                alert(`Somethin wrong: ${error}`);
            })
        }
        else{
            setParties(JSON.parse(localStorage.getItem('Parties')));
        }
    }

    const handlePartySelecterChange = ()=>{

    }
    const handlePartySelecterOpen = ()=>{

    }

    const handleSalesOfficersSelecterChange = ()=>{

    }
    const handleSalesOfficersSelecterOpen = ()=>{

    }
    


    return (
        <div className={classes.formRoot}>
            <Grid container justifyContent='center' direction='column'>
                <Grid item >
                    <Selecter
                        title='Party'
                        handleChange={handlePartySelecterChange}
                        onOpen={handlePartySelecterOpen}
                        value={fields.party}
                        choises={parties}
                    />
                </Grid>
                <Grid item >
                    <Selecter
                        title='Sales Officer'
                        handleChange={handleSalesOfficersSelecterChange}
                        onOpen={handleSalesOfficersSelecterOpen}
                        value={fields.sale_officer}
                        choises={salesofficers}
                    />
                </Grid>
            </Grid>
        </div>
    )
}

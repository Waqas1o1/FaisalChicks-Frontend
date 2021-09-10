import { Button, Grid, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useEffect, useState } from 'react';
import SaveIcon from '@material-ui/icons/Save';
import GetTable from './components/GetTable';
import CachedIcon from '@material-ui/icons/Cached';


import axiosInstance from '../apisConfig';

const useStyles = makeStyles((theme) => ({
    formRoot: {
      flexGrow: 1,
      padding : theme.spacing(2),
    },
}))

const AddParty = () => {
    
    const [rows,setRows] = useState([]);
    const [fields,setFields] = useState({});
    async function fetchCompanies(){
        return await axiosInstance.get('Party/')
        .then(res=>{
            let data  = res.data;
            if (data['error'] === true){
                alert(`Error Occures ${data['message']}`);
            }
            else{
                setRows(data['data']);
            }
        })
        .catch(error=>{
            alert(`Somethin wrong: ${error}`)
        })
    }


    const classes = useStyles();
    useEffect(() => {
        fetchCompanies();
    }, []);
    
    return (
        <Grid container>
            <Grid item xs={11} >     
                <Typography variant="h4" gutterBottom  color='primary'>Add Party</Typography>
            </Grid>
            <Grid item xs={1}>
                <Button onClick={fetchCompanies}>
                    <CachedIcon ></CachedIcon>
                </Button>     
            </Grid>

           <Grid item xs={12} md={4}>
                <Grid container item direction='column' spacing={3}>
                    <Grid item xs>
                        <TextField id="outlined-search" size='small' name='name' 
                         
                        label="Name" type="string" variant="outlined" required/>
                    </Grid>
                    <Grid item xs>
                        <TextField id="outlined-search" size='small' label="Contact" 
                        variant="outlined"
                        type="number"
                        />  
                    </Grid>
                    <Grid item xs>
                        <TextField id="outlined-search" size='small' label="Opening Balance" type="number" variant="outlined" />
                    </Grid>

                    <Grid item container >
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        className={classes.button}
                        startIcon={<SaveIcon />}
                    >
                        Save
                    </Button>
                    </Grid>
                </Grid>
           </Grid>
           <Grid item xs={12} md={8}>
                <GetTable rows={rows} columns={['Name','Contact','Discounted Amount','Opening Balance']}/>
           </Grid>
        </Grid>
    );
}

export default AddParty;

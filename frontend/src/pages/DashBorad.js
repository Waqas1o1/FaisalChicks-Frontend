import { Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import SettingsBackupRestoreRoundedIcon from '@material-ui/icons/SettingsBackupRestoreRounded';
import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded';
import PersonPinCircleRoundedIcon from '@material-ui/icons/PersonPinCircleRounded';
import PersonAddRoundedIcon from '@material-ui/icons/PersonAddRounded';
import AddShoppingCartRoundedIcon from '@material-ui/icons/AddShoppingCartRounded';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import CategoryIcon from '@material-ui/icons/Category';
import AccountTreeIcon from '@material-ui/icons/AccountTree';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height:'130px',
    width:'130px',
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center'
  },
  f60:{
    fontSize:40
  },
  textWhite:{
    color:'white'
  },
  bgBlue:{
    backgroundColor:'#170337'
  },
  bgPink:{
    backgroundColor: '#DC2B50'
  },
  bgPurpal:{
    backgroundColor: 'green'
  },

  
}));
 
const DashBorad = () => {
  
    const classes = useStyles();
    return (
      <div className={classes.root}>
        <Typography variant='h4'  color='primary' gutterBottom>
              Home
        </Typography>
        {/* Add  */}
        <Grid container style={{padding:'30px'}} spacing={2} justifyContent='center' alignItems="center" >
          <Grid item xs={12} sm={4} md={3} lg={2} container justifyContent='center'>
            <Paper className={`${classes.paper} ${classes.bgBlue}`}>
              <HomeRoundedIcon fontSize='large' className={`${classes.textWhite} ${classes.f60}`}/>
              <Typography variant="button" display="block" gutterBottom >
                <Link className={classes.textWhite} to='/addParty'>Add Party</Link>
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={2} container justifyContent='center'>
            <Paper className={`${classes.paper} ${classes.bgPink}`}>
              <PersonAddRoundedIcon fontSize='large' className={`${classes.textWhite} ${classes.f60}`}/>
              <Typography variant="button" display="block" gutterBottom className={classes.textWhite}>
                Add Party
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={2} container justifyContent='center'>
            <Paper className={`${classes.paper} ${classes.bgPurpal}`}>
              <CategoryIcon fontSize='large' className={`${classes.textWhite} ${classes.f60}`}/>
              <Typography variant="button" display="block" gutterBottom className={classes.textWhite}>
                Add Category
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={2} container justifyContent='center'>
            <Paper className={`${classes.paper} ${classes.bgBlue}`}>
              <AccountTreeIcon fontSize='large' className={`${classes.textWhite} ${classes.f60}`}/>
              <Typography variant="button" display="block" gutterBottom className={classes.textWhite}>
                Add Product
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={2} container justifyContent='center'>
            <Paper className={`${classes.paper} ${classes.bgBlue}`}>
              <AccountBalanceIcon fontSize='large' className={`${classes.textWhite} ${classes.f60}`}/>
              <Typography variant="button" display="block" gutterBottom className={classes.textWhite}>
                Add Bank
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        {/* View */}
        <Grid container style={{padding:'30px'}} spacing={2} justifyContent='center'  alignItems="center">
          <Grid item xs={12} sm={4} md={3} lg={2} container justifyContent='center'>
                <Paper className={`${classes.paper} ${classes.bgBlue}`}>
              <PersonPinCircleRoundedIcon fontSize='large' className={`${classes.textWhite} ${classes.f60}`}/>
              <Typography variant="button" display="block" gutterBottom className={classes.textWhite}>
                Party
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={4} md={3} lg={2} container justifyContent='center'>
            <Paper className={`${classes.paper} ${classes.bgBlue}`}>
              <SettingsBackupRestoreRoundedIcon fontSize='large' className={`${classes.textWhite} ${classes.f60}`}/>
              <Typography variant="button" display="block" gutterBottom className={classes.textWhite}>
                Recovery
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={4} md={3} lg={2} container justifyContent='center'>
            <Paper className={`${classes.paper} ${classes.bgBlue}`}>
              <VisibilityRoundedIcon fontSize='large' className={`${classes.textWhite} ${classes.f60}`}/>
              <Typography variant="button" display="block" gutterBottom className={classes.textWhite}>
                View Orders
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} sm={4} md={3} lg={2} container justifyContent='center'>
            <Paper className={`${classes.paper} ${classes.bgBlue}`}>
              <AddShoppingCartRoundedIcon fontSize='large' className={`${classes.textWhite} ${classes.f60}`}/>
              <Typography variant="button" display="block" gutterBottom className={classes.textWhite}>
                Add Product
              </Typography>
            </Paper>
          </Grid>
          
        </Grid>
        {/* Ledger */}
        <Grid container style={{padding:'30px'}} spacing={2} justifyContent='center'  alignItems="center" >
          
          <Grid item xs={12} sm={4} md={3} lg={2} container justifyContent='center'>
            <Paper className={`${classes.paper} ${classes.bgBlue}`}>
              <MenuBookIcon fontSize='large' className={`${classes.textWhite} ${classes.f60}`}/>
              <Typography variant="button" display="block" gutterBottom className={classes.textWhite}>
                Party Ledger
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={2} container justifyContent='center'>
            <Paper className={`${classes.paper} ${classes.bgBlue}`}>
              <MenuBookIcon fontSize='large' className={`${classes.textWhite} ${classes.f60}`}/>
              <Typography variant="button" display="block" gutterBottom className={classes.textWhite}>
                Cash Ledger
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={2} container justifyContent='center'>
            <Paper className={`${classes.paper} ${classes.bgBlue}`}>
              <MenuBookIcon fontSize='large' className={`${classes.textWhite} ${classes.f60}`}/>
              <Typography variant="button" display="block" gutterBottom className={classes.textWhite}>
                Clearning Ledger
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={2} container justifyContent='center'>
            <Paper className={`${classes.paper} ${classes.bgBlue}`}>
              <MenuBookIcon fontSize='large' className={`${classes.textWhite} ${classes.f60}`}/>
              <Typography variant="button" display="block" gutterBottom className={classes.textWhite}>
                SalesOfficer Ledger
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={2} container justifyContent='center'>
              <Paper className={`${classes.paper} ${classes.bgBlue}`}>
                <MenuBookIcon fontSize='large' className={`${classes.textWhite} ${classes.f60}`}/>
                <Typography variant="button" display="block" gutterBottom className={classes.textWhite}>
                  Bank Ledger
                </Typography>
              </Paper>
            </Grid>
        
        </Grid>
    </div>
    );
}

export default DashBorad;

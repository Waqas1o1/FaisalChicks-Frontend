import { Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
// import SettingsBackupRestoreRoundedIcon from '@material-ui/icons/SettingsBackupRestoreRounded';
import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded';
import PersonPinCircleRoundedIcon from '@material-ui/icons/PersonPinCircleRounded';
import PersonAddRoundedIcon from '@material-ui/icons/PersonAddRounded';
import AddShoppingCartRoundedIcon from '@material-ui/icons/AddShoppingCartRounded';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import CategoryIcon from '@material-ui/icons/Category';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import Divider from '@material-ui/core/Divider';
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
    alignItems:'center',
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
  link:{
    textDecoration:'None',
    fontSize:'12px'
  }
  
}));
 
const DashBorad = () => {
  
    const classes = useStyles();
    return (
      <div className={classes.root}>
        <Typography variant='h3'  color='primary' gutterBottom>
              DashBorad
        </Typography>
        {/* Add  */}
        <Grid container style={{padding:'30px'}} spacing={2} justifyContent='center' alignItems="center" >
          <Grid item xs={12} >
            <Typography variant="h4" display="block" color='textSecondary'  align='center'>
                ENTITIES
            </Typography>
          </Grid>
          <Grid item xs={6} sm={4} md={3} lg={2} container justifyContent='center'>
            <Paper className={`${classes.paper} ${classes.bgBlue}`}>
              <HomeRoundedIcon fontSize='large' className={`${classes.textWhite} ${classes.f60}`}/>
              <Typography variant="button" display="block" gutterBottom >
                <Link className={`${classes.textWhite} ${classes.link}`} to='/addParty'>
                  Add Party
                </Link>
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={4} md={3} lg={2} container justifyContent='center'>
            <Paper className={`${classes.paper} ${classes.bgPink}`}>
              <PersonAddRoundedIcon fontSize='large' className={`${classes.textWhite} ${classes.f60}`}/>
              <Typography variant="button" display="block" gutterBottom className={classes.textWhite}>
              <Link className={`${classes.textWhite} ${classes.link}`} to='/addPartyDiscount'>
                  Add Party Discount
                </Link>
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={4} md={3} lg={2} container justifyContent='center'>
            <Paper className={`${classes.paper} ${classes.bgPurpal}`}>
              <CategoryIcon fontSize='large' className={`${classes.textWhite} ${classes.f60}`}/>
              <Typography variant="button" display="block" gutterBottom className={classes.textWhite}>
                <Link className={`${classes.textWhite} ${classes.link}`} to='/addCategory'>
                  Add Category
                </Link>
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={4} md={3} lg={2} container justifyContent='center'>
            <Paper className={`${classes.paper} ${classes.bgBlue}`}>
              <AccountTreeIcon fontSize='large' className={`${classes.textWhite} ${classes.f60}`}/>
              <Typography variant="button" display="block" gutterBottom className={classes.textWhite}>
                <Link className={`${classes.textWhite} ${classes.link}`} to='/addProduct'>
                    Add Product
                </Link>
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={4} md={3} lg={2} container justifyContent='center'>
            <Paper className={`${classes.paper} ${classes.bgBlue}`}>
              <AccountBalanceIcon fontSize='large' className={`${classes.textWhite} ${classes.f60}`}/>
              <Link className={`${classes.textWhite} ${classes.link}`} to='/addBank'>
                  Add Bank
              </Link>
            </Paper>
          </Grid>
        </Grid>
        {/* View */}
        <Divider variant="middle" />
        <Grid container style={{padding:'30px'}} spacing={2} justifyContent='center'  alignItems="center">
          <Grid item xs={12} >
            <Typography variant="h4" display="block" color='textSecondary'  align='center'>
                Recordes
            </Typography>
          </Grid>
          <Grid item xs={6} sm={4} md={3} lg={2} container justifyContent='center'>
                <Paper className={`${classes.paper} ${classes.bgBlue}`}>
              <PersonPinCircleRoundedIcon fontSize='large' className={`${classes.textWhite} ${classes.f60}`}/>
              <Typography variant="button" display="block" gutterBottom className={classes.textWhite}>
                <Link className={`${classes.textWhite} ${classes.link}`} to='/PartyOrder'>
                  Party Order
                </Link>
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={6} sm={4} md={3} lg={2} container justifyContent='center'>
            <Paper className={`${classes.paper} ${classes.bgBlue}`}>
              <VisibilityRoundedIcon fontSize='large' className={`${classes.textWhite} ${classes.f60}`}/>
              <Typography variant="button" display="block" gutterBottom className={classes.textWhite}>
                <Link className={`${classes.textWhite} ${classes.link}`} to='/Recovery'>
                  Recovery
                </Link>
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={6} sm={4} md={3} lg={2} container justifyContent='center'>
            <Paper className={`${classes.paper} ${classes.bgBlue}`}>
              <VisibilityRoundedIcon fontSize='large' className={`${classes.textWhite} ${classes.f60}`}/>
              <Typography variant="button" display="block" gutterBottom className={classes.textWhite}>
                <Link className={`${classes.textWhite} ${classes.link}`} to='/ViewOrder'>
                  View Order
                </Link>
              </Typography>
            </Paper>
          </Grid>
         
        </Grid>
        {/* Ledger */}
        <Divider variant="middle" />
        <Grid container style={{padding:'30px'}} spacing={2} justifyContent='center'  alignItems="center" >          
          <Grid item xs={12} >
            <Typography variant="h4" display="block" color='textSecondary' align='center'>
                Ledgers
            </Typography>
          </Grid>
          <Grid item xs={6} sm={4} md={3} lg={2} container justifyContent='center'>
            <Paper className={`${classes.paper} ${classes.bgBlue}`}>
              <MenuBookIcon fontSize='large' className={`${classes.textWhite} ${classes.f60}`}/>
              <Typography variant="button" display="block" gutterBottom >
              <Link className={`${classes.textWhite} ${classes.link}`} to='/PartyLedger'>
                  Party Ledger
              </Link>
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={4} md={3} lg={2} container justifyContent='center'>
            <Paper className={`${classes.paper} ${classes.bgBlue}`}>
              <MenuBookIcon fontSize='large' className={`${classes.textWhite} ${classes.f60}`}/>
              <Link className={`${classes.textWhite} ${classes.link}`} to='/CashLedger'>
                  Cash Ledger
              </Link>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={4} md={3} lg={2} container justifyContent='center'>
            <Paper className={`${classes.paper} ${classes.bgBlue}`}>
              <MenuBookIcon fontSize='large' className={`${classes.textWhite} ${classes.f60}`}/>
              <Link className={`${classes.textWhite} ${classes.link}`} to='/ClearingLedger'>
                  Clearing Ledger
              </Link>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={4} md={3} lg={2} container justifyContent='center'>
            <Paper className={`${classes.paper} ${classes.bgBlue}`}>
              <MenuBookIcon fontSize='large' className={`${classes.textWhite} ${classes.f60}`}/>
              <Link className={`${classes.textWhite} ${classes.link}`} to='/salesOfficerLedger'>
                  Sales Offocer Ledger
              </Link>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={4} md={3} lg={2} container justifyContent='center'>
            <Paper className={`${classes.paper} ${classes.bgBlue}`}>
              <MenuBookIcon fontSize='large' className={`${classes.textWhite} ${classes.f60}`}/>
              <Link className={`${classes.textWhite} ${classes.link}`} to='/SalesLedger'>
                  Sales Ledger
              </Link>
            </Paper>
          </Grid>    
          <Grid item xs={6} sm={4} md={3} lg={2} container justifyContent='center'>
              <Paper className={`${classes.paper} ${classes.bgBlue}`}>
                <MenuBookIcon fontSize='large' className={`${classes.textWhite} ${classes.f60}`}/>
                <Typography variant="button" display="block" gutterBottom className={classes.textWhite}>
                  <Link className={`${classes.textWhite} ${classes.link}`} to='/DiscountLedger'>
                    Discount Ledger
                  </Link>
                </Typography>
              </Paper>
          </Grid>        
          <Grid item xs={6} sm={4} md={3} lg={2} container justifyContent='center'>
              <Paper className={`${classes.paper} ${classes.bgBlue}`}>
                <MenuBookIcon fontSize='large' className={`${classes.textWhite} ${classes.f60}`}/>
                <Typography variant="button" display="block" gutterBottom className={classes.textWhite}>
                  <Link className={`${classes.textWhite} ${classes.link}`} to='/FreightLedger'>
                    Freight Ledger
                  </Link>
                </Typography>
              </Paper>
          </Grid>        
          <Grid item xs={6} sm={4} md={3} lg={2} container justifyContent='center'>
              <Paper className={`${classes.paper} ${classes.bgBlue}`}>
                <MenuBookIcon fontSize='large' className={`${classes.textWhite} ${classes.f60}`}/>
                <Typography variant="button" display="block" gutterBottom className={classes.textWhite}>
                  <Link className={`${classes.textWhite} ${classes.link}`} to='/IncentiveLedger'>
                      Incentive Ledger
                    </Link>
                  </Typography>
              </Paper>
          </Grid>        
        
          <Grid item xs={6} sm={4} md={3} lg={2} container justifyContent='center'>
              <Paper className={`${classes.paper} ${classes.bgBlue}`}>
                <MenuBookIcon fontSize='large' className={`${classes.textWhite} ${classes.f60}`}/>
                <Typography variant="button" display="block" gutterBottom className={classes.textWhite}>
                  <Link className={`${classes.textWhite} ${classes.link}`} to='/BankLedger'>
                      Bank Ledger
                    </Link>
                  </Typography>
              </Paper>
          </Grid>        
        
        </Grid>
    </div>
    );
}

export default DashBorad;

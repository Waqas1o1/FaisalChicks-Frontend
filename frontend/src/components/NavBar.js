import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import { Collapse, InputBase } from '@material-ui/core';
import FindReplaceOutlinedIcon from '@material-ui/icons/FindReplaceOutlined';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { Link } from 'react-router-dom';
import SettingsInputComponentIcon from '@material-ui/icons/SettingsInputComponent';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import QueuePlayNextIcon from '@material-ui/icons/QueuePlayNext';
import PersonIcon from '@material-ui/icons/Person';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import MoneyIcon from '@material-ui/icons/Money';
import PregnantWomanIcon from '@material-ui/icons/PregnantWoman';
import ReceiptIcon from '@material-ui/icons/Receipt';
import AssignmentLateIcon from '@material-ui/icons/AssignmentLate';
import HdrStrongIcon from '@material-ui/icons/HdrStrong';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  white:{
    color:'#ffffff'
  },
  input:{
    color:'#ffffff',
  },
  link:{
    textDecoration:'none'
  },
  linkText:{
    color:'#6b6b6b'
  }
}));

export default function NavBar(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [openLedger, setpOenLedger] = React.useState(false);
  const [openAdd, setpOenAdd] = React.useState(false);

  const handleOpenLedgerClick = () => {
    setpOenLedger(!openLedger);
  };
  const handleOpenAddClick = () => {
    setpOenAdd(!openAdd);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={`${clsx(classes.menuButton, open && classes.hide )} ${classes.white}`}
          >
            <MenuIcon />
          </IconButton>
          <InputBase
            className={classes.input}
            placeholder="Search Google Maps"
            inputProps={{ 'aria-label': 'search google maps' }}
          />
          <IconButton type="submit"  className={classes.white} aria-label="search">
            <FindReplaceOutlinedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
        {/* Main */}
            <Link to='/' className={`${classes.link} ${classes.linkText}`} >  
              <ListItem button key={'DashBorad'} onClick={handleDrawerClose}>
                    <ListItemIcon> 
                      <DashboardIcon /> 
                    </ListItemIcon>
                <ListItemText primary={'DashBorad'} />
              </ListItem>
            </Link>
            <Link to='/Components' className={`${classes.link} ${classes.linkText}`}>  
              <ListItem button key={'Components'} onClick={handleDrawerClose}>
                    <ListItemIcon> 
                      <SettingsInputComponentIcon /> 
                    </ListItemIcon>
                <ListItemText primary={'Components'} />
              </ListItem>
            </Link>
            {/* Add  */}
            <Divider />
            <ListItem button onClick={handleOpenAddClick}>
              <ListItemIcon>
                <QueuePlayNextIcon />
              </ListItemIcon>
              <ListItemText primary="Add Entities" />
              {openAdd ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openAdd} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
              <Link to='/addParty' className={`${classes.link} ${classes.linkText}`} > 
                <ListItem button className={classes.nested} onClick={handleDrawerClose}>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText primary="Add Party" />
                </ListItem>
              </Link>
              <Link to='/addPartyDiscount' className={`${classes.link} ${classes.linkText}`} > 
                <ListItem button className={classes.nested} onClick={handleDrawerClose}>
                  <ListItemIcon>
                    <PersonAddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Add Party Discount" />
                </ListItem>
              </Link>
              <Link to='/addCategory' className={`${classes.link} ${classes.linkText}`} > 
                <ListItem button className={classes.nested} onClick={handleDrawerClose}>
                  <ListItemIcon>
                    <AddToPhotosIcon />
                  </ListItemIcon>
                  <ListItemText primary="Add Category" />
                </ListItem>
              </Link>
              <Link to='/addBank' className={`${classes.link} ${classes.linkText}`} > 
                <ListItem button className={classes.nested} onClick={handleDrawerClose}>
                  <ListItemIcon>
                    <AccountTreeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Add product" />
                </ListItem>
              </Link>
              <Link to='/addProduct' className={`${classes.link} ${classes.linkText}`} > 
                <ListItem button className={classes.nested} onClick={handleDrawerClose}>
                  <ListItemIcon>
                    <AccountBalanceIcon />
                  </ListItemIcon>
                  <ListItemText primary="Add Bank" />
                </ListItem>
              </Link>
              </List>
            </Collapse>
            <Divider />
            {/* Ledgers */}
            <ListItem button onClick={handleOpenLedgerClick}>
              <ListItemIcon>
                <MenuBookIcon />
              </ListItemIcon>
              <ListItemText primary="Ledger" />
              {openLedger ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openLedger} timeout="auto" unmountOnExit>
              <Link to='/PartyLedger' className={`${classes.link} ${classes.linkText}`} > 
                <ListItem button className={classes.nested}  onClick={handleDrawerClose} >
                  <ListItemIcon>
                    <AddToPhotosIcon />
                  </ListItemIcon>
                  <ListItemText primary="Party Ledger" />
                </ListItem>
              </Link>
              <Link to='/CashLedger' className={`${classes.link} ${classes.linkText}`} > 
                <ListItem button className={classes.nested}  onClick={handleDrawerClose} >
                  <ListItemIcon>
                    <LocalAtmIcon />
                  </ListItemIcon>
                  <ListItemText primary="Cash Ledger" />
                </ListItem>
              </Link>
              <Link to='/ClearingLedger' className={`${classes.link} ${classes.linkText}`} > 
                <ListItem button className={classes.nested}  onClick={handleDrawerClose} >
                  <ListItemIcon>
                    <MoneyIcon />
                  </ListItemIcon>
                  <ListItemText primary="Clearing Ledger" />
                </ListItem>
              </Link>
              <Link to='/SalesOfficerLedger' className={`${classes.link} ${classes.linkText}`} > 
                <ListItem button className={classes.nested}  onClick={handleDrawerClose} >
                  <ListItemIcon>
                    <PregnantWomanIcon />
                  </ListItemIcon>
                  <ListItemText primary="Sales Officer Ledger" />
                </ListItem>
              </Link>
              <Link to='/SalesLedger' className={`${classes.link} ${classes.linkText}`} > 
                <ListItem button className={classes.nested}  onClick={handleDrawerClose} >
                  <ListItemIcon>
                    <ReceiptIcon />
                  </ListItemIcon>
                  <ListItemText primary="Sales Ledger" />
                </ListItem>
              </Link>
              <Link to='/DiscountLedger' className={`${classes.link} ${classes.linkText}`} > 
                <ListItem button className={classes.nested}  onClick={handleDrawerClose} >
                  <ListItemIcon>
                    <AssignmentLateIcon />
                  </ListItemIcon>
                  <ListItemText primary="Discount Ledger" />
                </ListItem>
              </Link>
              <Link to='/FreightLedger' className={`${classes.link} ${classes.linkText}`} > 
                <ListItem button className={classes.nested}  onClick={handleDrawerClose} >
                  <ListItemIcon>
                    <HdrStrongIcon />
                  </ListItemIcon>
                  <ListItemText primary="Freight Ledger" />
                </ListItem>
              </Link>
              <Link to='/IncentiveLedger' className={`${classes.link} ${classes.linkText}`} > 
                <ListItem button className={classes.nested}  onClick={handleDrawerClose} >
                  <ListItemIcon>
                    <AccountBalanceWalletIcon />
                  </ListItemIcon>
                  <ListItemText primary="Incentive Ledger" />
                </ListItem>
              </Link>
              <Link to='/BankLedger' className={`${classes.link} ${classes.linkText}`} > 
                <ListItem button className={classes.nested}  onClick={handleDrawerClose} >
                  <ListItemIcon>
                    <AccountBalanceIcon />
                  </ListItemIcon>
                  <ListItemText primary="Bank Ledger" />
                </ListItem>
              </Link>
            </Collapse>
       
        </List>
        
      </Drawer>
      <main
        className={clsx(classes.content, {[classes.contentShift]: open})}>
        <div className={classes.drawerHeader} />
        {props.children}
      </main>
    </div>
  );
}

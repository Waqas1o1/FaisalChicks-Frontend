import React, {useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@material-ui/core';

import Layout from './pages/container/Layout';
// Main Pages
import GraphAnalysis from './pages/GraphAnalysis';
import DashBorad from './pages/DashBorad';
// Add
import AddParty from './pages/Add/AddParty';
import AddPartyDiscount from './pages/Add/AddPartyDiscount';
import AddCategory from './pages/Add/AddCategory';
import AddBank from './pages/Add/AddBank';
import AddProduct from './pages/Add/AddProduct';
// Ledgers
import PartyLedger from './pages/Ledgers/PartyLedger';
import CashLedger from './pages/Ledgers/CashLedger';
import ClearingLedger from './pages/Ledgers/ClearingLedger';
import SalesOfficerLedger from './pages/Ledgers/SalesOfficerLedger';
import SalesLedger from './pages/Ledgers/SalesLedger';
import FreightLedger from './pages/Ledgers/FreightLeadger';
import DiscountLedger from './pages/Ledgers/DiscountLedger';
import IncentiveLedger from './pages/Ledgers/IncentiveLedger';
import BankLedger from './pages/Ledgers/BankLedger';
import PartyOrder from './pages/Records/PartyOrder';
import OrderView from './pages/Records/OrderView';
import Recovery from './pages/Records/Recovery';
import Sginin from './pages/Authentications/Sginin';
import { ToastContainer } from "react-toastify";

// 
import { connect } from 'react-redux';
import { authCheckState } from './store/actions/auth';

const theme = createTheme({
  palette: {
    primary: {
      main: "#64C1A4",
    },
    success:{
      main: '#64C1A4'
    }
    
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
    h3:{
      '@media only screen and (max-width: 600px)':{
        fontSize:'20px'
      }
    },
    h4:{
      '@media only screen and (max-width: 600px)':{
        fontSize:'18px'
      }
    },
    h5:{
      '@media only screen and (max-width: 600px)':{
        fontSize:'16px'
      }
    },
  },
 
});



const App = (props) => {
  useEffect(() => {
    props.onLoad()
  }, [] )

  return(
    <ThemeProvider theme={theme}>
            <Router>
                <Layout>
                    <ToastContainer hideProgressBar={true} newestOnTop={true} />
                    <Switch>
                        <Route exact path='/' component={GraphAnalysis} />
                        <Route exact path='/Components' component={DashBorad} />
                        <Route exact path='/addParty' component={AddParty} />
                        <Route exact path='/addPartyDiscount' component={AddPartyDiscount} />
                        <Route exact path='/addCategory' component={AddCategory} />
                        <Route exact path='/addBank' component={AddBank} />
                        <Route exact path='/addProduct' component={AddProduct} />
                        {/* Ledgers */}
                        <Route exact path='/PartyLedger' component={PartyLedger} />
                        <Route exact path='/CashLedger' component={CashLedger} />
                        <Route exact path='/ClearingLedger' component={ClearingLedger} />
                        <Route exact path='/SalesOfficerLedger' component={SalesOfficerLedger} />
                        <Route exact path='/SalesLedger' component={SalesLedger} />
                        <Route exact path='/DiscountLedger' component={DiscountLedger} />
                        <Route exact path='/FreightLedger' component={FreightLedger} />
                        <Route exact path='/IncentiveLedger' component={IncentiveLedger} />
                        <Route exact path='/BankLedger' component={BankLedger} />
                        {/* Records */}
                        <Route exact path='/PartyOrder' component={PartyOrder} />
                        <Route exact path='/ViewOrder' component={OrderView} />
                        <Route exact path='/Recovery' component={Recovery} />
                        {/* Authentication */}
                        <Route exact path='/Login' component={Sginin} />
                      
                    </Switch>
                </Layout>
            </Router>
    </ThemeProvider>
)};

const mapStateToProps = state =>{
  return {
    authenticated: state.token !== null,
  };
}
const mapDispacthToProps = dispacth =>{
  return {
    onLoad : ()=>dispacth(authCheckState())
  }
}
export default connect(mapStateToProps, mapDispacthToProps)(App);

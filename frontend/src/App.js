import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@material-ui/core';

import Layout from './pages/container/Layout';
import DashBorad from './pages/DashBorad';

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
  },
 
});


const App = () => (
    <ThemeProvider theme={theme}>
            <Router>
                <Layout>
                    <Switch>
                        <Route exact path='/' component={DashBorad} />
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
                    </Switch>
                </Layout>
            </Router>
    </ThemeProvider>
);

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@material-ui/core';
import Layout from './pages/container/Layout';
import DashBorad from './pages/DashBorad';
import AddParty from './pages/AddParty';
// import AddCompany from './pages/AddCompany';


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
                    </Switch>
                </Layout>
            </Router>
    </ThemeProvider>
);

export default App;
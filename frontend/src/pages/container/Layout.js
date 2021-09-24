import { Container } from '@material-ui/core';
import React from 'react';
// import MessageAlert from '../../components/MessageAlert';
import NavBar from '../../components/NavBar';

const Layout = (props) => {
    return (
    <NavBar>
        <Container maxWidth='xl'>
            {props.children}
        </Container>
    </NavBar>        
        
    );
};




export default Layout;

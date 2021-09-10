import React from 'react';
import NavBar from '../components/NavBar';


const Layout = (props) => {
    return (
    <NavBar>
        {props.children}
    </NavBar>        
        
    );
};




export default Layout;

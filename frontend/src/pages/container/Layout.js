import React from 'react';
// import MessageAlert from '../../components/MessageAlert';
import NavBar from '../../components/NavBar';

const Layout = (props) => {
    return (
    <NavBar>
        {props.children}
        {/* <MessageAlert/> */}
    </NavBar>        
        
    );
};




export default Layout;

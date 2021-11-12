import { Container } from '@material-ui/core';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { authCheckState } from '../../store/actions/auth';
import NavBar from '../../components/NavBar';
import { useLocation } from 'react-router';
import { ToastContainer } from 'react-toastify';
const Layout = (props) => {
    const location = useLocation();
    useEffect(() => {
        props.onLoad();
     }, [location, props])
    return (
    <NavBar>
        <Container maxWidth='xl'>
            {props.children}
            <ToastContainer position="bottom-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </Container>
    </NavBar>        
        
    );
};


const mapStateToProps = (state) =>{
    return {
        authenticated: state.token !== null
    };
  }
  const mapDispatchToProps = (dispatch) =>{
    return {
        onLoad: () => dispatch(authCheckState()),
    };
  }
  
export default connect(mapStateToProps,mapDispatchToProps)(Layout);


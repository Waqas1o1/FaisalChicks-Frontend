import { Container } from '@material-ui/core';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { authCheckState } from '../../store/actions/auth';
// import MessageAlert from '../../components/MessageAlert';
import NavBar from '../../components/NavBar';
import { useLocation } from 'react-router';

const Layout = (props) => {
    const location = useLocation();
    useEffect(() => {
        props.onLoad();
     }, [location, props])
    return (
    <NavBar>
        <Container maxWidth='xl'>
            {props.children}
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


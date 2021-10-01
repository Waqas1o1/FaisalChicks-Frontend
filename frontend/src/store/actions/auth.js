import *  as actionTypes from "./actionTypes";
import axiosInstance from '../../apisConfig';
import axios from 'axios';

export const authStart = () =>{
    return {
        type:actionTypes.AUTH_START
    };
};

export const  authSuccess = (token) =>{
    return {
        type: actionTypes.AUTH_SUCCESS,
        token:token
    }
};

export const authFail = (error) =>{
    return {
        type: actionTypes.AUTH_FAIL,
        error,
    }
};



export const authLogout = () =>{
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const authLogin = (username, password) =>{
    return dispatch =>{
        dispatch(authStart());
        localStorage.removeItem('token');
        axios.post('http://127.0.0.1:8000/auth/login/',{
            username,
            password
        })
        .then((res)=>{
            const token = res.data.token;
            const expiry = res.data.expiry;
            localStorage.setItem('token',token);
            localStorage.setItem('expiry',expiry);
            window.location.replace("/");
        })
        .catch((err =>{
            dispatch(authFail(err))
        }))   
    }
} 


export const authSignup = (username, email, password, role) =>{
    return dispatch =>{
        console.log('IN Sginup')
        dispatch(authStart());
        axiosInstance.post('/auth/register/',{
            username,
            email,
            password,
            role
        })
        .then((res)=>{
            const token = res.data.key;
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
            localStorage.setItem('token',token);
            localStorage.setItem('expirationDate',expirationDate);
            window.location.replace("/");
        })
        .catch((err =>{
            dispatch(authFail(err))
        }));   
    };
};

export const authCheckState = () =>{
    return dispatch =>{
        const token = localStorage.getItem('token');
        var expiry = localStorage.getItem('expiry');
        if (token === undefined || token  === null){
            dispatch(authLogout())
        }
        else{
            expiry = new Date(expiry);
            if ( expiry <= new Date()){
                dispatch(authLogout());
            }else{
                dispatch(authSuccess(token));
            }
        };
    }
}
import *  as actionTypes from "./actionTypes";
import axios from 'axios';

export const authStart = () =>{
    return {
        type:actionTypes.AUTH_START
    };
};

export const  authSuccess = (token) =>{
    return {
        type: actionTypes.AUTH_SUCCESS,
        token:token,
    }
};

export const authFail = (error) =>{
    return {
        type: actionTypes.AUTH_FAIL,
        error,
    }
};

export const setAuthTimeout = expirationTime =>{
    return dispatch =>{
        setTimeout(()=>{
            dispatch(authLogout());
        },expirationTime * 1000);
    }
}

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
        axios.post('http://127.0.0.1:8000/rest-auth/login/',{
            username,
            password
        })
        .then((res)=>{
            const token = res.data.key;
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
            localStorage.setItem('token',token);
            localStorage.setItem('expirationDate',expirationDate);
            dispatch(setAuthTimeout(3600));
            window.location.replace("/");
        })
        .catch((err =>{
            dispatch(authFail(err))
        }))   
    }
} 


export const authSignup = (username, email, password1, password2) =>{
    return dispatch =>{
        dispatch(authStart());
        axios.post('http:127.0.0.1:8000/rest-aut/registration/',{
            username,
            email,
            password1,
            password2
        })
        .then((res)=>{
            const token = res.data.key;
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
            localStorage.setItem('token',token);
            localStorage.setItem('expirationDate',expirationDate);
            dispatch(setAuthTimeout(3600));
            window.location.replace("/");
        })
        .catch((err =>{
            dispatch(authFail(err))
        }));   
    };
};

export const authCheckState = () =>{
    return dispatch =>{
        const token = localStorage.getItem('token')
        if (token === undefined || token  === null){
            dispatch(authLogout())
        }
        else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if ( expirationDate <= new Date()){
                dispatch(authLogout())
            }else{
                dispatch(authSuccess(token));
                dispatch(setAuthTimeout(
                    (expirationDate.getTime() - new Date().getTime()) / 1000
                ));
            }
        };
    }
}
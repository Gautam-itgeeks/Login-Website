import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import SignUp from './SignUp/SignUp';


function PrivateComponent() {
    const token = sessionStorage.getItem('token');
    console.log(token);
     return token ? <Outlet/> : <Navigate to='/SignUp' />
 
}

export default PrivateComponent
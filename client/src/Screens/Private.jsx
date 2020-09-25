import React, { Component } from 'react'
import Logout from '../Components/Logout.js'
import { authenticate, isAuth } from '../helpers/auth';
import { Link, Redirect } from 'react-router-dom';

const Private = () => {

   
    return (
        <div>
        {isAuth() ? <Redirect to='/' /> : null}
       <Logout></Logout>
       </div>
    )
}

export default Private
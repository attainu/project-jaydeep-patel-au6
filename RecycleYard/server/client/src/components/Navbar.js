import React, { Component,useContext } from 'react';
import Profile from './screens/Profile';
import {Link,useHistory} from "react-router-dom";

import { UserContext } from './../App';
import ScrapRequest from './screens/ScrapRequest';

const NavBar = () => {
  var {state,dispatch}=useContext(UserContext)
  var history=useHistory()
  var renderList=()=>{
    if (state)   
    {
      return[
        <li><Link to="/profile">Profile</Link></li>,
        <li><Link to="/create">Post craft Ideas</Link></li>,
        <li><Link to="/ScrapRequest">Scrap Request</Link></li>,
        <li><Link to="/ScrapDetails">ScrapDetails</Link></li>,
        <li><Link to="/Shopping">Shopping</Link></li>,

        <li><button
        className="btn waves-effect waves-light #d50000 red accent-4"
        onClick={() => {localStorage.clear()
          dispatch({type:"CLEAR"})
        history.push('/signin')}} 
      >
        LogOut
      </button></li>
      ]

    }else{
      return [
        <li><Link to="/signin">Signin</Link></li>,
        <li><Link to="/signup">SignUp</Link></li>,
        <li><Link to="/adminData">Admin</Link></li>,
      ]

    }
  }
    return ( <nav>
        <div className="nav-wrapper white" >
          <Link to={state?"/" : "/signin"} className="brand-logo left">RecycleYard</Link>
          <ul id="nav-mobile" className="right">
            {renderList()}
          </ul>
        </div>
      </nav> );
}
 
export default NavBar;
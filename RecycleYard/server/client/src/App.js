import React, { useEffect, createContext,useReducer,useContext } from "react";
import NavBar from "./components/Navbar";
import Home from "./components/screens/Home";
import Signin from "./components/screens/SignIn";
import Profile from "./components/screens/Profile";
import Signup from "./components/screens/Signup"; 
import UserProfile from "./components/screens/UserProfile";
import ScrapRequest1 from './components/screens/ScrapRequest'
import AdminData from './components/Admin/admin_Data'
import ScrapStatus from './components/screens/ScrapData'
import { BrowserRouter, Switch, Route, Link,useHistory } from "react-router-dom";
import CretePost from "./components/screens/CreatePost";
import { reducer, initialState } from './reducers/userReducer'
import "./App.css";

//shopping cart
import Shopping from './ShoppingCart/Components/Home'


//Creating context
export var UserContext = createContext();

var Routing = () => {

  var history=useHistory()
  var {state,dispatch}=useContext(UserContext)
  useEffect(()=>
  {
    var user=JSON.parse(localStorage.getItem("user"))
    console.log(user)
    if (user)
      {
        console.log("App",user,window.location.href)
        dispatch({type:"USER",payload:user})
        
        // if(window.location.href === 'http://localhost:3000/ScrapRequest'){
        //   history.push('/ScrapRequest')
        // }else if(window.location.href === 'http://localhost:3000/Shopping' ){
        //   history.push('/Shopping')
        // }else{
          history.push('/')
        // }
        // history.push('/')
       
      }
      else{
        history.push('/signin')
      }
  },[])
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/signin">
        <Signin />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route exact path="/signup">
        <Signup />
      </Route>
      <Route exact path="/create">
        <CretePost />
      </Route>
      <Route exact path="/profile/:userid">
        <UserProfile />
      </Route>
      <Route exact path="/scrapRequest">
        <ScrapRequest1 />
      </Route>
      <Route exact path="/adminData">
        <AdminData />
      </Route>
      <Route exact path="/ScrapDetails">
        <ScrapStatus />
      </Route>
      <Route exact path="/shopping">
        <Shopping/>
      </Route>
    </Switch>
  );
};

function App() {
  var [state,dispatch]=useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
      <NavBar />
      <Routing/>
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;

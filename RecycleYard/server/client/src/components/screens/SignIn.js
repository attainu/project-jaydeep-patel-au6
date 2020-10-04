import React, { Component, useState,useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import {UserContext} from '../../App'
import M from "materialize-css";


const SignIn = () => {
  var {state,dispatch}=useContext(UserContext)
  var history = useHistory();
  var [password, setPassword] = useState("");
  var [email, setEmail] = useState("");

  //Posting data

  var PostData = () => {
    fetch("/signIn", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password,
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.user);
        if (data.error) {
          M.toast({ html: data.error, classes: "#d50000 red accent-4" });
        } else {
          localStorage.setItem("jwt",data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          dispatch({type:"USER",payload:data.user})
          M.toast({
            html: " Signed In successfully",
            classes: "#4caf50 green",
          });
          history.push("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="mycard ">
      <div className="card auth-card input-field">
        <h2>Recycal Yard</h2>

        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="btn waves-effect waves-light #64b5f6 blue lighten-2"
          onClick={() => PostData()}
        >
          Login
        </button>
        <h6>
          <Link to="/signup">Don't have an account</Link>
        </h6>
      </div>
    </div>
  );
};

export default SignIn;

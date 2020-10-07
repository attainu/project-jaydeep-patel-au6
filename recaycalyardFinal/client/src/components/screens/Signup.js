import React, { Component, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import M from "materialize-css";

const Signup = () => {
  var history = useHistory();
  var [name, setName] = useState("");
  var [password, setPassword] = useState("");
  var [email, setEmail] = useState("");
  var [image, setImage] = useState("");
  var [url, setURL] = useState(undefined);
  useEffect(() => {
    if (url) {
      uploadFields();
    }
  }, [url]);

  var uploadPic = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "insta-clone");
    data.append("cloud_name", "djztjkizu");
    fetch("	https://api.cloudinary.com/v1_1/djztjkizu/image/upload", {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data)
        setURL(data.url);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  var uploadFields = () => {
    fetch("/signUp", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        password,
        email,
        pic: url,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error, classes: "#d50000 red accent-4" });
        } else {
          M.toast({ html: data.message, classes: "#4caf50 green" });
          history.push("/signin");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  var PostData = () => {
    if (image) {
      uploadPic();
    } else {
      uploadFields();
    }
    //Check valiodation
    // if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))

    // {
    //   M.toast({html: "Invalid Email",classes:"#d50000 red accent-4"})
    //   return
    // }
  };

  return (
    <div className="mycard ">
      <div className="card auth-card input-field">
        <h2>Sing Up</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <div className="file-field input-field">
          <div className="btn #64b5f6 blue lighten-2">
            <span>Upload Pic</span>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>

        <button
          className="btn waves-effect waves-light #64b5f6 blue lighten-2"
          onClick={() => PostData()}
        >
          Signup
        </button>
        <h6>
          <Link to="/signin">Already have an account?</Link>
        </h6>
      </div>
    </div>
  );
};

export default Signup;

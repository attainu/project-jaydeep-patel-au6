import React, { Component, useState, useEffect, useContext } from "react";
import { UserContext } from "./../../App";
import { Link } from "react-router-dom";

const AdminData = () => {
  var [data, setData] = useState([]);
  var { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    fetch("/adminAllData", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("Home", result);
        setData(result.posts);
      });
  }, []);

  // {data.map((item) => {
  // console.log(item);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Quantity</th>
            <th>Address</th>
            <th>Pic</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Alvin</td>
            <td>Eclair</td>
            <td>$0.87</td>
            <td>abc</td>
            <td>abc</td>
          </tr>
          <tr>
            <td>Alan</td>
            <td>Jellybean</td>
            <td>$3.76</td>
            <td>abc</td>
            <td>abc</td>
          </tr>
          <tr>
            <td>Jonathan</td>
            <td>Lollipop</td>
            <td>$7.00</td>
            <td>abc</td>
            <td>abc</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AdminData;

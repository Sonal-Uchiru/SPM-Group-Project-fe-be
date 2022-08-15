import React, {useState} from "react";
import UserDetails from "../cards/userDetails";
import ProfileMain from "../cards/userProfileMain";
import UserSummary from "../cards/userSummary";
// import { BsArrowLeft, BsArrowRight } from "react-icons/all";
// require("react/package.json");
// require("react-dom/package.json");

import "../css/userProfile.css";

export default function TestPdf() {
  const ref = React.createRef();

  const options = {};

  return (
    <div className="user-profile">
      <div ref={ref} className="">
        <h1 className="d-flex justify-content-center" style={{ color: "red" }}>
          ddd
        </h1>

        <table border="1">
          <tr>
            <th>Company</th>
            <th>Contact</th>
            <th>Country</th>
          </tr>
          <tr>
            <td>Alfreds Futterkiste</td>
            <td>Maria Anders</td>
            <td>Germany</td>
          </tr>
          <tr>
            <td>Centro comercial Moctezuma</td>
            <td>Francisco Chang</td>
            <td>Mexico</td>
          </tr>
          <tr>
            <td>Ernst Handel</td>
            <td>Roland Mendel</td>
            <td>Austria</td>
          </tr>
          <tr>
            <td>Island Trading</td>
            <td>Helen Bennett</td>
            <td>UK</td>
          </tr>
          <tr>
            <td>Laughing Bacchus Winecellars</td>
            <td>Yoshi Tannamuri</td>
            <td>Canada</td>
          </tr>
          <tr>
            <td>Magazzini Alimentari Riuniti</td>
            <td>Giovanni Rovelli</td>
            <td>Italy</td>
          </tr>
        </table>
      </div>
      <br />
      <br />
    </div>
  );
}

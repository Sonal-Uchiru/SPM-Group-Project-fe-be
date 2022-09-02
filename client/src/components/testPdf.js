import React, { useState } from "react";
import { renderToString } from "react-dom/server";
import * as jsPDF from "jspdf";

export default function TestPdf() {
  return (
    <div className="container company-details">
      <div className="App">
        <h1 id="content">Hello CodeSandbox</h1>
        <h2>
          <Prescription />
        </h2>
      </div>
    </div>
  );
}

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center",
};
const colstyle = {
  width: "30%",
};
const tableStyle = {
  width: "100%",
};

const Prints = () => (
  <div>
    <h3>Time & Materials Statement of Work (SOW)</h3>
    <h4>General Information</h4>
    <table id="tab_customers" class="table table-striped" style={tableStyle}>
      <colgroup>
        <col span="1" style={colstyle} />
        <col span="1" style={colstyle} />
      </colgroup>
      <thead>
        <tr class="warning">
          <th>SOW Creation Date</th>
          <th>SOW Start Date</th>
          <th>Project</th>
          <th>Last Updated</th>
          <th>SOW End Date</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Dec 13, 2017</td>
          <td>Jan 1, 2018</td>
          <td>NM Connect - NMETNMCM</td>
          <td>Dec 13, 2017</td>
          <td>Dec 31, 2018</td>
        </tr>
      </tbody>
    </table>
    <p>
      This is a Time and Materials Statement of Work between Northwestern Mutual
      Life Insurance Company and Infosys with all general terms and conditions
      as described in the current Master Agreement and its related documents
    </p>
  </div>
);

const print = () => {
  const string = renderToString(<Prints />);
  const pdf = new jsPDF("p", "mm", "a4");

  pdf.fromHTML(string);
  pdf.save("pdf");
};

const Prescription = () => {
  return (
    <div>
      <h1>RECETA</h1>
      <div style={styles}>
        <h2>Start editing to see some magic happen {"\u2728"}</h2>
        <button onClick={print}>print</button>
      </div>
    </div>
  );
};

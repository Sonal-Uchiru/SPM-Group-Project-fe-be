import React from "react";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import "../css/userList.css";
import SummaryCard from "../cards/summaryCard";

export default function UserList() {
  $(document).ready(function () {
    $("#userListTable").DataTable();
  });

  return (
    <div className="userList">
      <h2 className="pageTitle">
        <i className="fa fa-arrow-left" />
        User List
      </h2>
      <div className="row d-flex justify-content-center">
        <div className="col-md-3">
          <SummaryCard topic="Admin" count="40" />
        </div>
        <div className="col-md-3">
          <SummaryCard topic="User" count="30" />
        </div>
        <div className="col-md-3">
          <SummaryCard topic="Male" count="30" />
        </div>
        <div className="col-md-3">
          <SummaryCard topic="Female" count="30" />
        </div>
      </div>
      <div className="report mt-2">
        <button type="button" className="btn btn-primary downloadReportButton">
          <i className="fa fa-download" />
          Download Report
        </button>
      </div>
      <div className="col-md-12 user-list-table-div">
        <div className="scrollbar">
          <table
            id="userListTable"
            className="table table-bordered table-sm nowrap table-hover user-list-table"
          >
            <thead>
              <tr>
                <th />
                <th>Full Name</th>
                <th>Role</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>Last Updated Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <img src="./images/user.jpg" className="tableImg" alt="" />
                </td>
                <td>Kaveen Perera</td>
                <td>User</td>
                <td>0778899384</td>
                <td>Kaveen@gmail.com</td>
                <td>18/12/2012, 03:00:00</td>
                <td>
                  <img
                    src="./../images/view.png"
                    className="tableEdit"
                    alt=""
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <img src="./images/user.jpg" className="tableImg" alt="" />
                </td>
                <td>Kaveen Perera</td>
                <td>User</td>
                <td>0778899384</td>
                <td>Kaveen@gmail.com</td>
                <td>18/12/2012, 03:00:00</td>
                <td>
                  <img
                    src="./../images/view.png"
                    className="tableEdit"
                    alt=""
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <br />
    </div>
  );
}

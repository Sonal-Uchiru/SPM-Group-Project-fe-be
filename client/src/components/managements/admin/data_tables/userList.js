import React, {useEffect, useState} from "react";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import "../css/userList.css";
import SummaryCard from "../cards/summaryCard";
import {App_Routes} from "../../../../constant/appRoutes";
import {BsArrowLeft} from "react-icons/all";
import {getAllUsers, getUserDetails} from "../../../../api/managements/userApi";
import {getJobById} from "../../../../api/managements/jobApi";
import {ErrorAlert} from "../../../../sweet_alerts/error";
import moment from "moment";

export default function UserList() {

  const [users, setUsers] = useState([]);
  const userProfilePlaceHolder = "https://firebasestorage.googleapis.com/v0/b/moon-cinema-rest-api.appspot.com/o/Additional%2Fuser%20(8).png?alt=media&token=9cef4e9b-1e8c-43ca-95b7-19c6e9ec8781"

  useEffect(() => {
    getAllUsers().then((res) => {
      if (res.data) setUsers(res.data)
      $(document).ready(function () {
        $("#userListTable").DataTable();
      });
      console.log(res.data)
    }).catch(async (err) => {
      console.log(err)
      await ErrorAlert('Something went wrong!')
    })
  }, [])

  return (
      <div className="userList">
        <h2 className="pageTitle">
          <BsArrowLeft className="Back"/>
          User List
        </h2>
        <div className="row d-flex justify-content-center">
          <SummaryCard topic="Admin" count="40"/>
          <SummaryCard topic="User" count="30"/>
          <SummaryCard topic="Male" count="30"/>
          <SummaryCard topic="Female" count="30"/>
        </div>
        <div className="report mt-4 mb-4">
          <button type="button" className="btn btn-primary downloadReportButton">
            <i className="fa fa-download"/>
            Download Report
          </button>
        </div>
        <br/><br/>
        <div className="col-md-12 user-list-table-div">
          <div className="scrollbar">
            <table
                id="userListTable"
                className="table table-bordered table-sm nowrap table-hover user-list-table"
            >
              <thead>
              <tr>
                <th/>
                <th>Full Name</th>
                <th>Role</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>Last Updated Date</th>
                <th>Action</th>
              </tr>
              </thead>
              <tbody>

              {users.map((users, index) => {
                return (
                    <>
                      <tr key={index}>
                        <td>
                          <img src={!users.profilePicture ? userProfilePlaceHolder : users.profilePicture}
                               className="tableImg" alt="profile picture"/>
                        </td>
                        <td>{users.firstName} {users.lastName}</td>
                        <td>{users.role}</td>
                        <td>{users.mobile}</td>
                        <td>{users.email}</td>
                        <td>{users.updatedDate ? moment(users.updatedDate).format('YYYY-MM-DD HH:mm:ss') : 'Not Updated!'}</td>
                        <td>
                          <img
                              src="./../images/eye.png"
                              className="tableEdit"
                              alt=""
                          />
                        </td>
                      </tr>
                    </>
                )
              })}
              </tbody>
            </table>
          </div>
          <br/>
        </div>
        <br/>
      </div>
  );
}
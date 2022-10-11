import React, {useEffect, useState} from "react";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import "../css/userList.css";
import SummaryCard from "../cards/summaryCard";
import {BsArrowLeft} from "react-icons/all";
import {getAllUsers, getUserDetails} from "../../../../api/managements/userApi";
import {ErrorAlert} from "../../../../sweet_alerts/error";
import moment from "moment";
import UserDetails from "../../user/cards/userDetails";
import {useNavigate} from "react-router";
import {App_Routes} from "../../../../constant/appRoutes";

export default function UserList() {

    const [users, setUsers] = useState([]);
    const userProfilePlaceHolder = "https://firebasestorage.googleapis.com/v0/b/moon-cinema-rest-api.appspot.com/o/Additional%2Fuser%20(8).png?alt=media&token=9cef4e9b-1e8c-43ca-95b7-19c6e9ec8781"
    const navigate = useNavigate();
    const [statistics, setStatistics] = useState({
        statType1: 0,
        statType2: 0,
        statType3: 0,
    });

    const filterStatistics = (payload, type1, type2) => {
        const category1 = payload.filter((user) => {
            return user.role.toLowerCase() === type1;
        }).length;
        const category2 = payload.filter((user) => {
            return user.role.toLowerCase() === type2;
        }).length;


        setStatistics({
            statType1: category1,
            statType2: category2,
            statType3: (category1 + category2)
        });

        console.log(payload)
    };


    useEffect(() => {
        getAllUsers().then((res) => {
            if (res.data) {
                setUsers(res.data)
                filterStatistics(res.data, "admin", "user")
            }
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
              User List
          </h2>
          <div className="row d-flex justify-content-center">
              <SummaryCard topic="Admin" count={statistics.statType1}/>
              <SummaryCard topic="User" count={statistics.statType2}/>
              <SummaryCard topic="Total" count={statistics.statType3}/>
              {/*<SummaryCard topic="Female" count={statistics.statType4}/>*/}
          </div>
          <div className="report mt-4 mb-4">
              <button type="button" className="btn btn-primary downloadReportButton"
                      onClick={() => navigate(App_Routes.USER_LIST_REPORT)}>
                  <i className="fa fa-download"/>
                  View Report
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
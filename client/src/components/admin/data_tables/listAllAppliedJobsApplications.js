import React from "react";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import "../css/allUserTable.css";

export default function AllJobApplications() {

    return (
        <div className="all-user-table">
            <div className="col-md-12 student-table-div">
                <div className="scrollbar">
                    <table
                        id="studentTable"
                        className="table table-bordered table-sm nowrap table-hover student-table"
                    >
                        <thead>
                        <tr>
                            <th/>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Mobile</th>
                            <th>Applied Date</th>
                            <th>Last Updated Date</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>
                                <img
                                    src=""
                                    className="tableImg"
                                />
                            </td>
                            <td>Nimal Perera</td>
                            <td>Male</td>
                            <td>0768899283</td>
                            <td>18/12/2012, 03:00:00</td>
                            <td>20/12/2012, 03:00:00</td>
                            <td>
                                <img
                                    src="./../images/editing.png"
                                    className="tableEdit"
                                />
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <br/>
        </div>
    );
}

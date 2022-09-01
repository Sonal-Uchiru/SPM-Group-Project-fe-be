import React from "react";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import "../css/listAllAppliedJobApplicationsCompany.css"

export default function ListAllAppliedJobApplicationsCompany() {
    $(document).ready(function () {
        $("#allAppliedJobApplicationsTable").DataTable();
    });

    return (
        <div className="appliedJobApplications">
            <h2 className="pageTitle">
                <i className="fa fa-arrow-left"/>
                Job Applications (Senior Software Engineer (Frontend Developer))
            </h2>
            <br/>
            <div className="report mt-4 mb-4">
                <button type="button" className="btn btn-primary downloadReportButton">
                    <i className="fa fa-download"/>
                    Download Report
                </button>
            </div>
            <br/><br/>
            <div className="col-md-12 applied-job-applications-table-div">
                <div className="scrollbar">
                    <table
                        id="allAppliedJobApplicationsTable"
                        className="table table-bordered table-sm nowrap table-hover applied-job-applications-table"
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
                                <img src="./images/user.jpg" className="tableImg" alt=""/>
                            </td>
                            <td>Kaveen Perera</td>
                            <td>Male</td>
                            <td>0778899384</td>
                            <td>18/12/2012, 03:00:00</td>
                            <td>18/12/2012, 03:00:00</td>
                            <td>
                                <img
                                    src="./../images/open.png"
                                    className="tableEdit"
                                    alt=""
                                />
                                <img
                                    src="./../images/file.png"
                                    className="tableEdit"
                                    alt=""
                                />
                                <img
                                    src="./../images/eye.png"
                                    className="tableEdit"
                                    alt=""
                                />
                                <img
                                    src="./../images/on-button.png"
                                    className="tableEdit"
                                    alt=""
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <img src="./images/user.jpg" className="tableImg" alt=""/>
                            </td>
                            <td>Kaveen Perera</td>
                            <td>Male</td>
                            <td>0778899384</td>
                            <td>18/12/2012, 03:00:00</td>
                            <td>18/12/2012, 03:00:00</td>
                            <td>
                                <img
                                    src="./../images/open.png"
                                    className="tableEdit"
                                    alt=""
                                />
                                <img
                                    src="./../images/file.png"
                                    className="tableEdit"
                                    alt=""
                                />
                                <img
                                    src="./../images/eye.png"
                                    className="tableEdit"
                                    alt=""
                                />
                                <img
                                    src="./../images/on-button.png"
                                    className="tableEdit"
                                    alt=""
                                />
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <br/>
            </div>
            <br/>
        </div>
    );
}

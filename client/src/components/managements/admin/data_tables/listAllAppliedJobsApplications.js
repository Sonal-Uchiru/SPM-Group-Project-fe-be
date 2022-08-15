import React from "react";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import "../css/listAllJobApplications.css"

export default function AllJobApplications() {

    $(document).ready(function () {
        $('#allJobApplicationsTable').DataTable();
    });

    return (
        <div className="allJobApplications">
            <h2 className="pageTitle"><i
                className="fa fa-arrow-left"/>Job Applications (Senior Software Engineer (Frontend Developer))</h2>
            <div className="report">
                <button type="button" className="btn btn-primary downloadReportButton"><i
                    className="fa fa-download"/>Download Report
                </button>
            </div>
            <div className="col-md-12 job-applications-table-div">
                <div className="scrollbar">
                    <table
                        id="allJobApplicationsTable"
                        className="table table-bordered table-sm nowrap table-hover job-applications-table"
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
                                    src="./images/user.jpg"
                                    className="tableImg"
                                    alt=""
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
                                    alt=""
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <img
                                    src="./images/user.jpg"
                                    className="tableImg"
                                    alt=""/>
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
                                    alt=""
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

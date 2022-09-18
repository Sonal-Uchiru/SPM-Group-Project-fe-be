import React from "react";
import "../css/report.css"
import SummaryCard from "../../admin/cards/summaryCard";
import moment from "moment";

export default function Report() {
    return (
        <div className="company-report">
            <div className="row container-fluid">
                <div className="col part-1 text-center">
                    <img
                        src="./../images/comercial.png"
                        className="img-fluid Image"
                        alt="image"
                    />
                    <div className="details">
                        <h2 className="company-name">Commercial Bank</h2>
                        <h4 className="field-type">Banking</h4>
                        <p className="address">No, 65A, Galle Road, Colombo 06</p>
                        <p className="email">contactcommercialbank@gmail.com</p>
                        <p className="phone">+94112657815</p>
                    </div>

                </div>

                <div className="col">
                    <div className="generated-date text-center">
                        <h5>Generated on</h5>
                        <p>2022/08/23 23:56:04</p>
                    </div>
                </div>
            </div>

            <h2 className="generated-month">September Report</h2>

            <div className="row d-flex justify-content-center">
                <SummaryCard
                    topic="Selected Applications"
                    count="30"
                />
                <SummaryCard topic="Rejected Applications" count="20"/>
            </div>

            <div className="job-applications-table-div">
                <div className="container-fluid">
                    <table
                        id="allJobApplicationsTable"
                        className="table table-bordered table-sm nowrap job-applications-table"
                    >
                        <thead>
                        <tr>
                            <th>No</th>
                            <th>Position</th>
                            <th>Development Area</th>
                            <th>Job Type</th>
                            <th>Created Date</th>
                            <th>Last Updated Date</th>
                        </tr>


                        </thead>
                        <tbody>
                        <tr>
                            <td>1</td>
                            <td>Software Engineer</td>
                            <td>Frontend</td>
                            <td>Full time</td>
                            <td>18/12/2012, 03:00:00</td>
                            <td>20/12/2012, 03:00:00</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Software Engineer</td>
                            <td>Frontend</td>
                            <td>Full time</td>
                            <td>18/12/2012, 03:00:00</td>
                            <td>20/12/2012, 03:00:00</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Software Engineer</td>
                            <td>Frontend</td>
                            <td>Full time</td>
                            <td>18/12/2012, 03:00:00</td>
                            <td>20/12/2012, 03:00:00</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="text-center site-logo">
                <img
                    src="./images/SPMNEW.png" width="160" height="60"
                    className="img-fluid logo"
                    alt="site logo"
                />
            </div>

            <br/>
        </div>
    )
}
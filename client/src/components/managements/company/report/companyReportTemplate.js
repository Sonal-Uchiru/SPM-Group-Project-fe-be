import React from "react";
import "../css/report.css";
import ReportHeader from "../../jobApplications/report/reportHeader";
import ReportWaterMark from "../../jobApplications/report/reportWaterMark";
import moment from "moment";
import "../../jobApplications/css/listAllAppliedJobApplications.css"

export default function CompanyReportTemplate({
                                                  tableHeaders = [],
                                                  tableMetaData = [],
                                                  companyDetails,
                                                  summaryCards = []
                                              }) {
    return (
        <>
            <div className="page">
                <div className="subpage">
                    <ReportWaterMark/>
                    <ReportHeader summaryCards={summaryCards}/>
                    <div className="job-applications-table-div">
                        <div className="container-fluid">
                            <table
                                id="allJobApplicationsTable"
                                className="table table-bordered table-sm nowrap job-applications-table"
                            >
                                <thead>
                                <tr>
                                    {tableHeaders && tableHeaders.map(th => {
                                        return (
                                            <th>{th}</th>
                                        )
                                    })}
                                </tr>
                                </thead>
                                <tbody>
                                {tableMetaData &&
                                    tableMetaData.map(data => {
                                        return (
                                            <tr>
                                                {/*<td>*/}
                                                {/*    <img*/}
                                                {/*        src={!data.logo ? "./../images/logo-placeholder-image-modified.png" : data.logo}*/}
                                                {/*        className="tableImg" alt="user profile"/>*/}
                                                {/*</td>*/}
                                                <td>{data.name}</td>
                                                <td>{data.field}</td>
                                                <td>{data.mobile}</td>
                                                <td>{moment(data.createdDate).format('YYYY-MM-DD HH:mm:ss')}</td>
                                                <td>{moment(data.updatedDate).format('YYYY-MM-DD HH:mm:ss')}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
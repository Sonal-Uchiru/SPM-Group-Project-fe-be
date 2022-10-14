import React from "react";
import "../css/report.css";
import ReportHeader from "../../jobApplications/report/reportHeader";
import ReportWaterMark from "../../jobApplications/report/reportWaterMark";
import moment from "moment";
import "../../jobApplications/css/listAllAppliedJobApplications.css"

export default function UserReportTemplate({
                                               tableHeaders = [],
                                               tableMetaData = [],
                                               companyDetails,
                                               summaryCards = []
                                           }) {

    const userProfilePlaceHolder = 'https://firebasestorage.googleapis.com/v0/b/moon-cinema-rest-api.appspot.com/o/Additional%2Fuser%20(8).png?alt=media&token=9cef4e9b-1e8c-43ca-95b7-19c6e9ec8781'
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
                                                {/*        src={!data.profilePicture ? userProfilePlaceHolder : data.profilePicture}*/}
                                                {/*        className="tableImg" alt="user profile"/></td>*/}
                                                <td>{`${data.firstName} ${data.lastName}`}</td>
                                                <td>{data.role}</td>
                                                <td>{data.mobile}</td>
                                                <td>{data.email}</td>
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
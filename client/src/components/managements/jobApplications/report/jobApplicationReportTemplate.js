import React from "react";
import "../css/report.css";
import ReportHeader from "./reportHeader";
import ReportWaterMark from "./reportWaterMark";
import moment from "moment";
import "../css/listAllAppliedJobApplications.css"

export default function JobApplicationReportTemplate({
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
                    <ReportHeader companyDetails={companyDetails} summaryCards={summaryCards}/>
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
                                                {/*        src={!data.userDetails[0].profilePicture ? userProfilePlaceHolder : data.userDetails[0].profilePicture}*/}
                                                {/*        className="tableImg" alt="user profile"/></td>*/}
                                                <td>{`${data.userDetails[0].firstName} ${data.userDetails[0].lastName}`}</td>
                                                <td>{data.userDetails[0].gender ? data.userDetails[0].gender : data.applicantOtherDetails.gender}</td>
                                                <td>{`0${data.userDetails[0].mobile}`}</td>
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
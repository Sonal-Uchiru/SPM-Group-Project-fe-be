import React from "react";
import "../css/report.css";
import ReportHeader from "./reportHeader";
import ReportFooter from "./reportFooter";

export default function Report({tableHeaders = [], tableMetaData = [], companyDetails, summaryCards = []}) {
    return (
        <>
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
                                        <td>
                                            {data.column1}
                                            {data.column2}
                                            {data.column3}
                                            {data.column4}
                                            {data.column5}
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
            <ReportFooter/>
        </>
    )
}
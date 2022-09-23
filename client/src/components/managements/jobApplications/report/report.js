import React from "react";
import "../css/report.css";
import ReportHeader from "./reportHeader";
import ReportFooter from "./reportFooter";

export default function Report({tableHeaders = [], tableMetaData = [], companyDetails, summaryCards = []}) {
    return (
        <>
            <div className="page">
                <div className="subpage">
                    <ReportFooter/>
                    <ReportHeader companyDetails={companyDetails} summaryCards={summaryCards}/>
                    <div className="job-applications-table-div">
                        <div className="container-fluid">
                            <table
                                id="allJobApplicationsTable"
                                className="table table-bordered table-sm nowrap job-applications-table"
                            >
                                <thead>
                                <tr>
                                    {/*{tableHeaders && tableHeaders.map(th => {*/}
                                    {/*    return (*/}
                                    <th>No</th>
                                    <th>Position</th>
                                    <th>Development Area</th>
                                    <th>Job Type</th>
                                    <th>Created Date</th>
                                    <th>Last Updated Date</th>

                                    {/*// {th}*/}
                                    {/*    )*/}
                                    {/*})}*/}
                                </tr>
                                </thead>
                                <tbody>
                                {/*{tableMetaData &&*/}
                                {/*    tableMetaData.map(data => {*/}
                                {/*        return (*/}
                                <tr>
                                    <td>1</td>
                                    <td>Senior Software Engineer</td>
                                    <td>Frontend</td>
                                    <td>Full time</td>
                                    <td>20/12/2012, 03:00:00</td>
                                    <td>20/12/2012, 03:00:00</td>
                                </tr>

                                <tr>
                                    <td>1</td>
                                    <td>Senior Software Engineer</td>
                                    <td>Frontend</td>
                                    <td>Full time</td>
                                    <td>20/12/2012, 03:00:00</td>
                                    <td>20/12/2012, 03:00:00</td>
                                </tr>

                                <tr>
                                    <td>1</td>
                                    <td>Senior Software Engineer</td>
                                    <td>Frontend</td>
                                    <td>Full time</td>
                                    <td>20/12/2012, 03:00:00</td>
                                    <td>20/12/2012, 03:00:00</td>
                                </tr>

                                <tr>
                                    <td>1</td>
                                    <td>Senior Software Engineer</td>
                                    <td>Frontend</td>
                                    <td>Full time</td>
                                    <td>20/12/2012, 03:00:00</td>
                                    <td>20/12/2012, 03:00:00</td>
                                </tr>

                                <tr>
                                    <td>1</td>
                                    <td>Senior Software Engineer</td>
                                    <td>Frontend</td>
                                    <td>Full time</td>
                                    <td>20/12/2012, 03:00:00</td>
                                    <td>20/12/2012, 03:00:00</td>
                                </tr>


                                <tr>
                                    <td>1</td>
                                    <td>Senior Software Engineer</td>
                                    <td>Frontend</td>
                                    <td>Full time</td>
                                    <td>20/12/2012, 03:00:00</td>
                                    <td>20/12/2012, 03:00:00</td>
                                </tr>


                                <tr>
                                    <td>1</td>
                                    <td>Senior Software Engineer</td>
                                    <td>Frontend</td>
                                    <td>Full time</td>
                                    <td>20/12/2012, 03:00:00</td>
                                    <td>20/12/2012, 03:00:00</td>
                                </tr>


                                <tr>
                                    <td>1</td>
                                    <td>Senior Software Engineer</td>
                                    <td>Frontend</td>
                                    <td>Full time</td>
                                    <td>20/12/2012, 03:00:00</td>
                                    <td>20/12/2012, 03:00:00</td>
                                </tr>


                                {/*        )*/}
                                {/*    })*/}
                                {/*}*/}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
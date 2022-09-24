import React from 'react';
import moment from "moment";
import "../css/report.css";
import ReportFooter from "./reportFooter";
import SummaryCardReport from "../cards/summaryCardReport";

function ReportHeader({companyDetails, summaryCards = []}) {
    return (
        <>
            <div className="row container-fluid">
                {companyDetails ? <div className="col-8 part-1 text-center">
                        <img
                            src="./../images/comercial.png"
                            className="img-fluid Image"
                            alt="image"
                        />
                        <div className="details">
                            <h5 className="company-name">Calcey Technologies</h5>
                            {/*{companyDetails.name}*/}
                            <h5 className="field-type">Banking</h5>
                            {/*{companyDetails.field}*/}
                            <p className="sub-details">No,65/A,Galle Road,Colombo 06</p>
                            {/*{companyDetails.address}*/}
                            <p className="sub-details">contactcommercialbank@gmail.com</p>
                            {/*{companyDetails.email}*/}
                            <p className="sub-details">+94112657815</p>
                            {/*{companyDetails.mobile}*/}
                        </div>
                    </div>
                    :
                    <div className="col-8 part-1 text-center">
                        <img
                            src="./../images/SPMLogo.png"
                            className="img-fluid Image"
                            alt="image"
                        />
                        <div className="details">
                            <h2 className="company-name">Job Search</h2>
                        </div>
                    </div>
                }

                <div className="col-4 float-right">
                    <div className="generated-date text-center">
                        <h5 className="generated-on"><b>Generated on</b></h5>
                        <p>{moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}</p>
                    </div>
                </div>
            </div>
            <h4 className="generated-month">{moment(new Date()).format('MMMM')} Report</h4>
            {/*/!*{card.name}*!/{card.count}*/}
            <div className="row d-flex justify-content-center cards">
                {/*{summaryCards.map(card => {*/}
                {/*    return (*/}
                <SummaryCardReport

                    topic="Information Technology"
                    count="50"
                />

                <SummaryCardReport

                    topic="Selected Applications"
                    count="50"
                />

                <SummaryCardReport

                    topic="Rejected"
                    count="50"
                />
                {/*    )*/}
                {/*})}*/}
            </div>
        </>
    );
}

export default ReportHeader;
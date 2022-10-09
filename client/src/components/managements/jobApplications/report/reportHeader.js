import React from 'react';
import moment from "moment";
import "../css/report.css";
import SummaryCardReport from "../cards/summaryCardReport";

function ReportHeader({companyDetails, summaryCards = []}) {
    return (
        <>
            <div className="row container-fluid">
                {companyDetails ? <div className="col-8 part-1 text-center">
                        <img
                            src={companyDetails.logo ? companyDetails.logo : "./../images/logo-placeholder-image-modified.png"}
                            className="img-fluid Image"
                            alt="logo"
                        />
                        <div className="details">
                            <h5 className="company-name">{companyDetails.name}</h5>

                            <h5 className="field-type">{companyDetails.field}</h5>

                            <p className="sub-details">{companyDetails.address}</p>

                            <p className="sub-details"><u>{companyDetails.email}</u></p>

                            <p className="sub-details">{companyDetails.mobile}</p>

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
            <div className="row d-flex justify-content-center cards">
                {summaryCards.map(card => {
                    return (
                        <SummaryCardReport

                            topic={card.name}
                            count={card.count}
                        />)
                })}
            </div>
        </>
    );
}

export default ReportHeader;
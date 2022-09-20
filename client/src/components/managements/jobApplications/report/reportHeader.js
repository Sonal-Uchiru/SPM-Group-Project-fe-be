import React from 'react';
import moment from "moment";
import SummaryCard from "../../admin/cards/summaryCard";
import "../css/report.css";

function ReportHeader({companyDetails, summaryCards = []}) {
    return (
        <>
            <div className="row container-fluid">
                {companyDetails ? <div className="col part-1 text-center">
                        <img
                            src="./../images/comercial.png"
                            className="img-fluid Image"
                            alt="image"
                        />
                        <div className="details">
                            <h2 className="company-name">{companyDetails.name}</h2>
                            <h4 className="field-type">{companyDetails.field}</h4>
                            <p className="address">{companyDetails.address}</p>
                            <p className="email">{companyDetails.email}</p>
                            <p className="phone">{companyDetails.mobile}</p>
                        </div>
                    </div>
                    :
                    <div className="col part-1 text-center">
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

                <div className="col float-right">
                    <div className="generated-date text-center">
                        <h5>Generated on</h5>
                        <p>{moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}</p>
                    </div>
                </div>
            </div>

            <h2 className="generated-month">{moment(new Date()).format('MMMM')} Report</h2>

            <div className="row d-flex justify-content-center">
                {summaryCards.map(card => {
                    return (
                        <SummaryCard
                            topic={card.name}
                            count={card.count}
                        />
                    )
                })}

            </div>
        </>
    );
}

export default ReportHeader;
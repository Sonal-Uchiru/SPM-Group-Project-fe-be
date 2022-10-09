import React from "react";
import "../css/summaryCardReport.css";

export default function SummaryCardReport(props) {
    return (
        <div className="group-summary-card-report shadow">
            <div className="row d-flex justify-content-center">
                <h4 className="col-md-6 text-center topic">{props.topic}</h4>
                <h5 className="col-md-4 text-center faculty-total mt-3">{props.count}</h5>
            </div>
        </div>
    );
}
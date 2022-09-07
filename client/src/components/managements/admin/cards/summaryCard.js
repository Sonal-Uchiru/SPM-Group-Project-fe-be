import React, {useImperativeHandle, useState} from "react";

import "../css/listAllJobApplications.css";
import "../css/summaryCard.css";
export default function SummaryCard(props) {

    return (
        <div className="group-summary-card shadow">
            <div className="row d-flex justify-content-center">
                <h4 className="col-md-6 ">{props.topic}</h4>
                <h5 className="col-md-4 faculty-total mt-3">{props.count}</h5>
            </div>
        </div>
    );
}

import React from "react";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "../css/panelSummaryCard.css";

export default function PanelSummary(props) {
    let panelTotal = props.panelNum;
    let monthlyRegTotal = props.monthlyReg;
    let faculty = props.faculty;

    return (
        <div className="panel-summary-card shadow">
            <div className="row">
                <div className="col-md-12 ">
                    <h1 className="d-flex justify-content-center faculty-total">
                        {panelTotal}
                    </h1>
                    <h5 className="d-flex justify-content-center">{faculty}</h5>
                    <h6 className="d-flex justify-content-center">
                        {monthlyRegTotal} Panels were created within this month
                    </h6>
                </div>
            </div>
        </div>
    );
}

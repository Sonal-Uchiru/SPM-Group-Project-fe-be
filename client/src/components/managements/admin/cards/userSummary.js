import React from "react";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "../css/userSummaryCard.css";

export default function UserSummary(props) {
    let staffTotal = props.staffNum;
    let studentTotal = props.studentNum;
    let faculty = props.faculty;


    return (
        <div className="all-students-card shadow">
            <div className="row">
                <div className="col-md-12 ">
                    <h1 className="d-flex justify-content-center faculty-total">
                        {staffTotal + studentTotal}
                    </h1>
                    <h5 className="d-flex justify-content-center">{faculty}</h5>
                </div>
            </div>
            <div className="row">
                <div className="col-md-7 d-flex justify-content-center">
                    <h7>Staff Members</h7>
                </div>
                <div className="col-md-5 d-flex justify-content-center">
                    <h7>{staffTotal}</h7>
                </div>
            </div>
            <div className="row">
                <div className="col-md-7 d-flex justify-content-center">
                    <h7>Students</h7>
                </div>
                <div className="col-md-5 d-flex justify-content-center">
                    <h7>{studentTotal}</h7>
                </div>
            </div>
        </div>
    );
}

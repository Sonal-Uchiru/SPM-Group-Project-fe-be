import React from 'react';
import "../css/report.css";

function ReportFooter(props) {
    return (
        <div className="company-report">
            <div className="text-center site-logo">
                <img
                    src="./images/SPMNEW.png" width="160" height="60"
                    className="img-fluid logo"
                    alt="site logo"
                />
            </div>
        </div>
    );
}

export default ReportFooter;
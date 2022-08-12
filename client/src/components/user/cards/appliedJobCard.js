import React from "react";
import "../css/appliedJobCard.css"

export default function AppliedJobCard() {
    return (
        <div className="container appliedJobCard">
            <div className="card mb-3">
                <div className="row g-0">
                    <div className="col-md-3">
                        <div className="logoImage text-center">
                            <img src="./images/rootCode.png" className="img-fluid companyLogo" alt="company_logo"/>
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="card-body">
                            <h4 className="card-title">Software Engineer (Full Stack Developer)</h4>
                            <p className="card-text1">Full Time Job</p>
                            <p className="card-text2">10 Applicants</p>

                            <div className="text-center">
                                <div className="btn-group me-2">
                                    <button type="button" className="btn btn-primary editButton">Edit</button>
                                </div>
                                <div className="btn-group me-2">
                                    <button type="button" className="btn btn-primary deleteButton">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-2">
                        <div className="recImage text-center">
                            <img src="./images/cross-button.png" className="img-fluid recruitingStatus"
                                 alt="recruiting_status"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
import React from "react";
import "../css/viewAllJobsCompany.css"
import AllJobsCardCompany from "../cards/allJobsCardCompany";

export default function ViewAllJobsCompany() {
    return (
        <div className="viewAllJobsCompany">
            <div className="searchBar text-center container">
                <form className="form-inline">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search Applied Jobs"
                           aria-label="Search"/>
                    <span className="p-viewer">
                    <img src="./images/search (3).png" className="searchIcon" alt="search_icon"/>
                  </span>
                </form>
            </div>
            <br/>
            <div className="container">
                <div className="btn-group me-2 btns">
                    <button type="button" className="btn btn-primary createJobButton"><i className="fa fa-plus-circle"/>Create
                        Job
                    </button>
                </div>
                <div className="btn-group me-2 btns">
                    <button type="button" className="btn btn-primary downloadReportButton"><i
                        className="fa fa-download"/>Download Report
                    </button>
                </div>
                <br/><br/>
            </div>

            <div className="pageBody">
                <AllJobsCardCompany/>
                <AllJobsCardCompany/>
            </div>
        </div>
    )
}
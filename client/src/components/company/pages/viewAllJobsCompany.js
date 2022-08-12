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

            <div className="pageBody">
                <AllJobsCardCompany/>
                <AllJobsCardCompany/>
            </div>
        </div>
    )
}
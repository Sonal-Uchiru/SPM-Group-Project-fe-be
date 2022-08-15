import React from "react";
import AllJobsCard from "../cards/allJobsCard";
import "../css/viewAllJobs.css"

export default function ViewAllJobs() {
    return (
        <div className="viewAllJobs">
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
                <AllJobsCard/>
                <AllJobsCard/>
            </div>
        </div>
    )
}
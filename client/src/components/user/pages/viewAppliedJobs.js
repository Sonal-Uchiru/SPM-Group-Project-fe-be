import React from "react";
import "../css/viewAppliedJobs.css"
import AppliedJobCard from "../cards/appliedJobCard";

export default function ViewAppliedJobs() {
    return (
        <div className="viewAppliedJobs">
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
                <AppliedJobCard/>
                <AppliedJobCard/>
                <AppliedJobCard/>
            </div>
        </div>
    )
}
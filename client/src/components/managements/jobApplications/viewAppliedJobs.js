import React, {useEffect, useState} from "react";
import "./css/viewAppliedJobs.css"
import AppliedJobCard from "./cards/appliedJobCard";
import {getAppliedJobApplications} from "../../../api/managements/jobApplicationApi";
import {ErrorAlert} from "../../../sweet_alerts/error";
import Loading from "../../external_components/spinners/loading";


export default function ViewAppliedJobs() {
    const [appliedJobApplication, setAppliedJobApplication] = useState([]);
    const [appliedJobApplicationTemp, setAppliedJobApplicationTemp] = useState([])
    const [loading, setLoading] = useState(true);
    const [empty, setEmpty] = useState(false);
    const [noData, setNoData] = useState({
        status: false,
        text: ""
    });

    useEffect(async () => {
        try {
            const content = await getAppliedJobApplications()
            if (!content.data.length) setEmpty(true)
            setAppliedJobApplication(content.data)
            setAppliedJobApplicationTemp(content.data)
            setLoading(false)
        } catch (e) {
            setLoading(false)
            await ErrorAlert("Something went wrong!")
        }
    }, [])

    const removeContent = (deletedJobApplicationIndex) => {
        const newJobApplications = appliedJobApplication.filter((jobApplication, index) => {
            return index !== deletedJobApplicationIndex
        })
        if (!newJobApplications.length) setEmpty(true)
        setAppliedJobApplication(newJobApplications)
    }

    const handleSearch = (e) => {
        if (empty) return

        const input = e.target.value

        setLoading(true)
        setNoData({status: false, text: ''})

        const filteredContent = appliedJobApplicationTemp.filter((jobApplication) =>
            jobApplication.jobDetails[0].position.toLowerCase().includes(input.toLowerCase())
        );

        if (filteredContent.length <= 0) {
            setAppliedJobApplication(filteredContent)
            setNoData({status: true, text: `No search results found for ${input}`})
            setLoading(false)
            return
        }

        setAppliedJobApplication(filteredContent)
        setLoading(false)
    }

    return (
        <div className="viewAppliedJobs">
            <div className="searchBar text-center container">
                <form className="form-inline">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search Applied Jobs"
                           aria-label="Search" onChange={handleSearch}/>
                    <span className="p-viewer">
                    <img src="./images/search (3).png" className="searchIcon" alt="search_icon"/>
                  </span>
                </form>
            </div>
            {loading && <Loading/>}
            <div className="pageBody">
                {!empty && appliedJobApplication.map((appliedJobApplication, index) => {
                    return (
                        <>
                            <AppliedJobCard jobApplicationDetails={appliedJobApplication}
                                            onDelete={() => removeContent(index)}/>
                        </>
                    )
                })}
            </div>
            {noData.status && <h3 className="red-text-color text-center"><b>{noData.text}</b></h3>}
            {empty && <h3 className="red-text-color text-center"><b>There are no any Applied Jobs available</b></h3>}
        </div>
    )
}
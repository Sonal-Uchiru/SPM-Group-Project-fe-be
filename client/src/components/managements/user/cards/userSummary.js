import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "../css/userSummary.css";
import {getUserAppliedJobs} from "../../../../api/managements/userApi";

export default function UserSummary(props) {

    const [appliedJobs, setAppliedJobs] = useState('');

    useEffect(() => {
        getAppliedJobs();
    }, [])

    async function getAppliedJobs() {
        const content = await getUserAppliedJobs()
        setAppliedJobs(content.data.length)
        // console.log(content.data.length)
    }

    return (
        <div className="container user-summary">
            <div className="card">
                <div className="row m-4">
                    <div>
                        <h2 className="summary-topic">Summary</h2>
                    </div>
                    <div className="d-flex justify-content-center">
                        <div className="text-center summary-div p-5">
                            <p className="summary-text">{appliedJobs}</p>
                        </div>
                    </div>
                    <h3 className="text-center sub-text mt-3">Number of Applied Jobs</h3>
                </div>
            </div>
            <br />
            <br />
        </div>
    );
}

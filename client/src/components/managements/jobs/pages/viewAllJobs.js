import React, {useState, useEffect, useRef, useMemo} from "react";
import {getAllJobs, getAllJobsByToken} from "../../../../api/managements/jobApi";
import Loading from "../../../external_components/spinners/loading";
import AllJobsCard from "../cards/allJobsCard";
import "../css/viewAllJobs.css";
import JobApplicationForm from "../../jobApplications/jobApplicationForm";
import {ErrorAlert} from "../../../../sweet_alerts/error";

export default function ViewAllJobs() {
    const [loadingStatus, setLoadingStatus] = useState(true);
    const [jobsArray, setJobsArray] = useState([]);
    const [duplicateJobsArray, setDuplicateJobsArray] = useState([]);
    const [errorText, setErrorText] = useState("");
    const [show, setShow] = useState(false)
    const [jobId, setJobId] = useState('')
    const [companyId, setCompanyId] = useState('')
    const [jobDetails, setJobDetails] = useState({
        logo: '',
        jobType: '',
        position: '',
        developmentArea: ''
    })

    const [currentIndex, setCurrentIndex] = useState(0)
    const [childRef, setChildRef] = useState([])


    useEffect(async () => {
        await allJobs()
    }, []);

    const allJobs = async () => {
        try {
            const content = await getAllJobs();
            if (content) {
                setJobsArray(content.data.content);
                setDuplicateJobsArray(content.data.content);
                console.log(Array.from({length: content.data.content.length}).map(() => React.createRef()))
                setChildRef(Array.from({length: content.data.content.length}).map(() => React.createRef()))
            }
            setLoadingStatus(false)
        } catch (e) {
            console.log(e)
            await ErrorAlert()
        }

    }

    function handleSearch(userIn) {
        setLoadingStatus(true);
        const result = duplicateJobsArray.filter((job) =>
            job.position.toLowerCase().includes(userIn.toLowerCase())
        );
        if (result.length > 0) {
            setJobsArray(result);
            setErrorText("");
        } else {
            setJobsArray(result);
            setErrorText(`No Jobs by name ${userIn}`);
        }
        setLoadingStatus(false);
    }

    const openModal = (job, index) => {
        setJobId(job._id)
        setCurrentIndex(index)
        setCompanyId(job.companyDetails[0]._id)
        setJobDetails({
            companyName: job.companyDetails[0].name,
            logo: job.companyDetails[0].logo,
            jobType: job.jobType,
            position: job.position,
            developmentArea: job.developmentArea
        })
        setShow(true)
    }

    const closeModal = () => {
        setShow(false)
    }


    const onSaveCloseModal = () => {
        try {
            childRef[currentIndex].current.updateCard()
            setShow(false)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <div className="viewAllJobs">
                <div className="searchBar text-center container">
                    <form className="form-inline">
                        <input
                            className="form-control mr-sm-2"
                            type="search"
                            placeholder="Search Jobs"
                            aria-label="Search"
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                        <span className="p-viewer">
            <img
                src="./images/search (3).png"
                className="searchIcon"
                alt="search_icon"
            />
          </span>
                    </form>
                </div>

                {loadingStatus && <Loading/>}

                <div className="pageBody">
                    <center>
                        <h4 className="text-danger mb-5">{errorText}</h4>
                    </center>
                    {jobsArray.map((post, index) => {
                        return <AllJobsCard key={post._id} index={index} content={post}
                                            onModalOpen={() => openModal(post, index)
                                            } refs={childRef[index]}/>;
                    })}
                </div>
            </div>
            {show && <JobApplicationForm onModalClose={closeModal} jobId={jobId} companyId={companyId}
                                         otherDetails={jobDetails} onSave={onSaveCloseModal}/>}
        </>
    );
}

import React, {useEffect, useRef, useState} from 'react';
import PdfGenerator from "../../../../generators/pdfGenerator";
import {getAllJobs, getAllJobsByToken, getJobById} from "../../../../api/managements/jobApi";
import UserReportTemplate from "./userReportTemplate";
import "../css/report.css";
import {getAppliedJobApplicationsByJobId} from "../../../../api/managements/jobApplicationApi";
import {getAllCompanies, getCompanyById} from "../../../../api/managements/companyAPI";
import moment from "moment";
import {getAllUsers} from "../../../../api/managements/userApi";

function UserReport(props) {
    const [items, setItems] = useState([])
    const [gen, setGen] = useState(false)
    const [company, setCompany] = useState([])
    const ref = useRef(null)
    const jobId = "63139786d20b38ecbd1721fe";

    const generatePDF = () => {
        ref.current.exportPDF()
    }

    const [summaryCards, setSummaryCards] = useState([])

    useEffect(() => {
        getAllUsers().then((res) => {
            console.log(res)
            const filteredData = res.data.filter(content => moment(content.createdDate).format('MMMM')
                === moment(new Date).format('MMMM'))
            setItems(filteredData)
            genSummaryData(filteredData)
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    const userTypeCount = (arr, type) => {
        return arr.filter(obj => {
            return obj.role === type;
        }).length;
    }
    const userGenderCount = (arr, type) => {
        return arr.filter(obj => {
            return obj.gender === type;
        }).length;
    }

    const genSummaryData = (data) => {
        if (data.length) {
            const admin = userTypeCount(data, "admin")
            const user = userTypeCount(data, "user")
            const male = userGenderCount(data, "Male")
            const female = userGenderCount(data, "Female")
            setSummaryCards([{
                name: "Admin",
                count: admin
            }, {
                name: "User",
                count: user
            }, {
                name: "Male",
                count: male
            },
                {
                    name: "Female",
                    count: female
                }])

        }
    }

    const tableHeaders = ["", "Full Name", "Role", "Mobile", "Email", "Last Updated Date"]

    return (
        <>
            <div className="d-flex justify-content-end me-5 mt-2">
                <button className="btn downloadReportBtn" onClick={generatePDF}>
                    <i className="fa fa-download me-2"/>
                    Download Report
                </button>
            </div>
            <PdfGenerator childComponent={<UserReportTemplate
                companyDetails={company} summaryCards={summaryCards}
                tableHeaders={tableHeaders}
                tableMetaData={items}/>} refs={ref} fileName={`${moment(new Date()).format('MMMM-YYYY')}-monthly-users-report.pdf`}/>
        </>
    );
}

export default UserReport;
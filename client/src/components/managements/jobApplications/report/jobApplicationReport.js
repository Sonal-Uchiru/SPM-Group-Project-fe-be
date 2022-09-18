import React, {useEffect, useRef, useState} from 'react';
import PdfGenerator from "../../../../generators/pdfGenerator";
import {getAllJobs} from "../../../../api/managements/jobApi";
import Report from "./report";
import "../css/report.css";

function JobApplicationReport(props) {
    const [items, setItems] = useState([])
    const [gen, setGen] = useState(false)
    const ref = useRef(null)

    const generatePDF = () => {
        ref.current.exportPDF()
    }

    useEffect(() => {
        getAllJobs().then((res) => {
            setItems(res.data.content)
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    return (
        <>
            <div className="d-flex justify-content-end me-5 mt-2">
                <button className="btn downloadReportBtn" onClick={generatePDF}>
                    <i className="fa fa-download me-2"/>
                    Download Report
                </button>
            </div>
            <PdfGenerator childComponent={<Report/>} refs={ref}
                          fileName={"apple.pdf"}/>
        </>
    );
}

export default JobApplicationReport;
import React, {useEffect, useRef, useState} from 'react';
import PdfGenerator from "../../../../generators/pdfGenerator";
import JobApplicationTemplate from "./jobApplicationTemplate";
import {getAllJobs} from "../../../../api/managements/jobApi";

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
            <div style={{textAlign: "center", marginBottom: 10}}>
                <button onClick={generatePDF} style={{margin: "auto"}}>
                    download
                </button>
            </div>
            <PdfGenerator childComponent={<JobApplicationTemplate table1={items} color={"blue"}/>} refs={ref}
                          fileName={"apple.pdf"}/>
        </>
    );
}

export default JobApplicationReport;
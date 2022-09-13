import React, {useState} from "react";
import "../css/companyProfile.css";
import {BsArrowLeft, BsArrowRight, GrResume} from "react-icons/all";
import {PDFExport} from "@progress/kendo-react-pdf";

// NPM = npm i @progress/kendo-react-pdf
//LINK = https://www.npmjs.com/package/@progress/kendo-react-pdf

export default function TestPdf() {
    let [resume, setResume] = useState("");

    const ref = React.createRef();

    function exportPDF() {
        resume.save();
    }

    return (
        <div className="companyProfile">
            <h2 className="title">
                <BsArrowLeft/>
                PDF Test
            </h2>
            <div style={{textAlign: "center", marginBottom: 10}}>
                <button onClick={exportPDF} style={{margin: "auto"}}>
                    download
                </button>
            </div>
            <PDFExport
                paperSize={"Letter"}
                fileName="test.pdf"
                scale={1}
                margin="0cm"
                title=""
                subject=""
                keywords=""
                ref={(r) => setResume(r)}
                forcePageBreak=".chapter"
            >
                <div>
                    <center>
                        <h1 style={{color: "red"}}>Hello</h1>
                    </center>
                    <h1>Hello</h1>
                    <h1>Hello</h1>
                    <h1>Hello</h1>
                    <h1>Hello</h1>
                </div>
            </PDFExport>
        </div>
    );
}

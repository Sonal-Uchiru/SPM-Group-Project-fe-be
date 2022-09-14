import React, {useImperativeHandle, useState} from "react";
import {PDFExport} from "@progress/kendo-react-pdf";

// NPM = npm i @progress/kendo-react-pdf , npm i @progress/kendo-licensing ,  npm i @progress/kendo-drawing
//LINK = https://www.npmjs.com/package/@progress/kendo-react-pdf

export default function PdfGenerator(props) {
    let [resume, setResume] = useState("");

    const ref = React.createRef();

    useImperativeHandle(props.refs, () => ({
        exportPDF() {
            resume.save();
        }
    }));

    return (
        <div>
            <PDFExport
                paperSize={"Letter"}
                fileName={props.fileName}
                scale={1}
                onChange={(r) => setResume(r)}
                ref={(r) => setResume(r)}
                forcePageBreak=".chapter"
            >
                {props.childComponent}
            </PDFExport>
        </div>
    );
}

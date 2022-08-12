import React from "react";
import "./footer.css"

export default function Footer() {
    return (
        <div className="footer">
            <footer className="text-white" id="footer">
                <div className="siteLogo">
                    <img src="./images/NewSPM.png" className="logo" alt="site_logo"/>
                    <br/>
                    <p id="copyright">Copyright 2022 © JOBSEARCH. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    )
}
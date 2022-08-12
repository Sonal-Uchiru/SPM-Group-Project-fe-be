import React from 'react'
import './footer.css'

export default function Footer() {

    return (

        <div className="footer">
            <footer
                className="text-center text-lg-start text-white" id="footer">
                <div className="row container-fluid">
                    <div className="">
                        <img src="./../images/NewSPM.png"
                             className="img-fluid siteLogo" alt="site_logo"/>
                    </div>
                </div>
                <div className="text-end" id="copyright">
                    Copyright 2022 © JOBSEARCH. All Rights Reserved.
                </div>
            </footer>
        </div>

    );


}
import React from 'react'
import '../css/footer.css'

export default function Footer() {

    return (

        <div className="footer">
            <footer className="text-white" id="footer">
                <div className="row">
                    <div className="logo">
                        <img src="./../images/NewSPM.png"
                             className="img-fluid siteLogo" alt="site_logo"/>
                    </div>
                    <p id="copyright"> Copyright 2022 © JOBSEARCH. All Rights Reserved.</p>
                </div>
            </footer>
        </div>

    );


}
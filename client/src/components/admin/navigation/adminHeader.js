import React, {useEffect, useState} from 'react'
import "../css/adminHeader.css";
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import showAlerts from '../../external_components/sweetAlerts'
import {getTokenFromLocalStorage, removeTokenFromLocalStorage} from '../../external_components/tokenHandling'

export default function AdminHeader() {

    let token = getTokenFromLocalStorage()
    let navigate = useNavigate()
    const [userDetails, setUserDetails] = useState([])


    useEffect(() => {
        if (token) {
            getUserDetails()
        }
    }, [])

    async function getUserDetails() {
        await axios({
            url: `http://localhost:8080/api/admins`,
            method: "GET",
            headers: {Authorization: `Bearer ${token}`}
        }).then((res) => {
            console.log(res.data)
            setUserDetails(res.data)

        }).catch((err) => {
            showAlerts(2, err)
        })

    }

    async function logOutProcess() {
        await removeTokenFromLocalStorage()
        navigate('/')
    }

    return (
        <div className="AdminHeader">
            <div className="Header">
                <img src="./../images/SLIIT_Logo.jpg" className="navl" alt=""/>

                <div class="containerr">
                    <div class="text1">
                        <p className="uname">{userDetails.email}</p>
                    </div>

                    <img src="./../images/user (2).png" className="user" alt=""/>
                </div>
                <br/>
                <div className="float-end me-5 mb-2">
                    <button className="btn btn-primary" onClick={() => logOutProcess()}>Log out</button>
                </div>

                <br/>

                <nav className="navbar navbar-expand-lg navbar-light">
                    <div className="container-fluid">
                        <a className="navbar-brand" onClick={() => {
                            navigate('/adminHome')
                        }}>SLIIT All Users</a>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNavAltMarkup"
                            aria-controls="navbarNavAltMarkup"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"/>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav">
                                {/*<a className="nav-link">Students</a>*/}
                                <a className="nav-link" onClick={() => {
                                    navigate('/studentGroups')
                                }}>Student Groups</a>

                                <a className="nav-link" onClick={() => {
                                    navigate('/allSubmission')
                                }}>Submissions</a>

                                <a className="nav-link" onClick={() => {
                                    navigate('/panels')
                                }}>Panels</a>

                                <a className="nav-link" onClick={() => {
                                    navigate('/allMarkingScheme')
                                }}>Marking Schemes</a>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
}

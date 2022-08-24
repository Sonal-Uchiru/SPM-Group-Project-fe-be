import React, {useEffect, useState} from "react";
import UserDetails from "../cards/userDetails";
import ProfileMain from "../cards/userProfileMain";
import UserSummary from "../cards/userSummary";
import "../css/userProfile.css";
import {BsArrowLeft} from "react-icons/all";


export default function UserProfile() {

    // const [user, setUser] = useState("");
    //
    // useEffect(() => {
    //     getUser();
    // }, []);
    //
    // async function getUser(){
    //     const content = await
    //     setUser(content.data)
    // }

    return (
        <div className="userProfile">
            <h2 className="title"><BsArrowLeft/> User Profile</h2>
            <div className="container-fluid">
                <div className="coverImage container-fluid">
                </div>
            </div>
            <div className="about">
                <ProfileMain/>
            </div>
            <div className="row otherD">
                <div className="col-md-5">
                    <UserSummary/>
                </div>
                <div className="col-md-7">
                    <UserDetails/>
                </div>
            </div>
        </div>

    );
}


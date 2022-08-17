import React, {useState} from "react";
import "../css/userProfileMain.css";

export default function ProfileMain() {
  return (
    <div className="usermain">
      <div className="card">
        <div className="row">
          <div className="col-md-4">
            <div className="text-center m-4">
              <img
                src="./images/user01.jpeg"
                className="img-fluid user-img"
                alt="Logo"
              />
            </div>
          </div>
          <div className="col-md-8">
            <div className="mt-3">
              <h3 className="text-center">Kathru Wijesinghe</h3>
              <h6 className="text-center" style={{ color: "#808080" }}>
                karthu@gmail.com
              </h6>
              <p className="pe-2 ps-3">
                I am a director of brand marketing, with experience managing
                global teams and multi-million-dollar campaigns. Her background
                in brand strategy, visual design, and account management inform
                her mindful but competitive approach.
              </p>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
    </div>
  );
}

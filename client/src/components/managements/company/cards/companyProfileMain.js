import React, {useState} from "react";
import "../css/companyProfileMain.css";

export default function CompanyProfileMain() {
  return (
    <div className="company-main">
      <div className="card">
        <div className="row">
          <div className="col-md-4">
            <div className="text-center m-4">
              <img
                src="./images/calcey-logo-1-1.jpeg"
                className="img-fluid user-img"
                alt="Logo"
              />
            </div>
          </div>
          <div className="col-md-8">
            <div className="mt-3">
              <h3 className="text-center">Calcey Technologies</h3>
              <h6 className="text-center" style={{ color: "#808080" }}>
                calcey@gmail.com{" "}
              </h6>
              <p className="pe-2 ps-3">
                Bloomberg's profile proves the company knows its audience,
                because they offer a few quick statistics, and then link to
                other areas of the site, such as Careers and Tech. While other
                businesses might do well in offering a creative, long-form
                story, Bloomberg's typical demographic is likely more.
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

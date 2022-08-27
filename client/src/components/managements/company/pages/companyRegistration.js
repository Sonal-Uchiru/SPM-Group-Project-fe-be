import React, { useState } from "react";
import "../css/companyRegistration.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { PasswordStrengthMeter } from "../../../external_components/validations/passwordStrengthIndecator";
import { BsArrowLeft } from "react-icons/all";

const eye = <FontAwesomeIcon icon={faEye} />;
const sleye = <FontAwesomeIcon icon={faEyeSlash} />;

export default function CompanyRegistration() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const [step1, setStep1] = useState(true);
  const [step2, setStep2] = useState(false);
  const [imgData, setImgData] = useState("");
  const [picture, setPicture] = useState("");
  let [placeHolder, setPlaceHolder] = useState(false);
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");

  const [company, setCompany] = useState({
    name: "",
    logo: imgData,
    email: "",
    address: "",
    field: "",
    password: "",
    mobile: 0,
    siteUrl: "",
  });

  const handleCompanyRegistrationFormChange = (e) => {
    setCompany((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const nextStep = () => {
    setStep1(false);
    setStep2(true);
  };

  const navigateBack = () => {
    setStep2(false);
    setStep1(true);
  };

  // Password toggle handler
  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordShown(!confirmPasswordShown);
  };

  const [passwordValidity, setPasswordValidity] = useState({
    minChar: null,
    number: null,
    specialChar: null,
  });
  const isNumberRegx = /\d/;
  const specialCharacterRegx = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

  function validatePassword() {
    if (
      passwordValidity.minChar &&
      passwordValidity.number &&
      passwordValidity.specialChar
    ) {
      return true;
    }
  }

  const onChangePicture = (e) => {
    if (e.target.files[0]) {
      setPlaceHolder(true);
      setPicture(e.target.files);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSignUp = () => {
    console.log(company);
  };

  return (
    <div className="companyRegistration">
      <section className="">
        <div className="container-fluid">
          <div className="row d-flex justify-content-center align-items-center row1">
            <div className="col-md-9 col-lg-6 col-xl-4">
              <div className="text-center">
                <img
                  src="./../images/SPMLogo.png"
                  className="img-fluid SiteLogo"
                  alt="site_logo"
                />
              </div>
              <br />
              <br />
              <h2 className="text-center quote">
                “The only way to do great work is to do what you love. If you
                haven’t found it yet, keep looking, Don’t settle.”{" "}
              </h2>
              <br />
            </div>

            <br />

            <div className="col-md-8 col-lg-6 col-xl-5 offset-xl-1 rightSide">
              <h1 className="signup">Start Hiring</h1>
              <br />
              <form>
                {step1 && (
                  <div>
                    <br />
                    <span>
                      <center>
                        <div className="box">
                          <img
                            className="z-depth-2 Img1"
                            alt="pro_image"
                            src="./images/logo-placeholder-image-modified.png"
                            data-holder-rendered="true"
                            hidden={placeHolder}
                          />

                          <img
                            className="z-depth-2 Img1"
                            alt="movie_image"
                            src={imgData}
                            id="movieImage"
                            data-holder-rendered="true"
                            hidden={!placeHolder}
                          />

                          <div className="image-upload">
                            <label htmlFor="file-input">
                              <img
                                src="./images/gallery.png"
                                className="Img2"
                                id="image-upload-btn"
                                alt="camera image"
                              />
                            </label>
                            <input
                              id="file-input"
                              type="file"
                              onChange={onChangePicture}
                            />
                          </div>
                        </div>
                      </center>
                    </span>
                    <br />

                    <div className="form-outline mb-3">
                      <label
                        className="form-label"
                        form="form3Example3"
                        id="companyName"
                      >
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="companyName"
                        name="name"
                        onChange={handleCompanyRegistrationFormChange}
                        className="form-control form-control-lg"
                        placeholder="Company Name"
                      />
                    </div>

                    <div className="form-outline mb-3">
                      <label
                        className="form-label"
                        form="form3Example3"
                        id="phoneNumber"
                      >
                        Phone Number
                      </label>
                      <input
                        type="text"
                        id="form3Example3"
                        className="form-control form-control-lg"
                        placeholder="Phone Number"
                        name="mobile"
                        onChange={handleCompanyRegistrationFormChange}
                      />
                    </div>

                    <div className="form-outline mb-3">
                      <label
                        className="form-label"
                        form="form3Example3"
                        id="address"
                      >
                        Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        className="form-control form-control-lg"
                        placeholder="Address"
                        name="address"
                        onChange={handleCompanyRegistrationFormChange}
                      />
                    </div>

                    <div className="form-outline mb-3">
                      <label
                        className="form-label"
                        form="form3Example3"
                        id="field"
                      >
                        Field
                      </label>
                      <select
                        className="form-select mb-3"
                        aria-label=".form-select-lg example"
                        name="field"
                        onChange={handleCompanyRegistrationFormChange}
                      >
                        <option selected disabled>
                          Field
                        </option>
                        <option value="Information Technology">
                          Information Technology
                        </option>
                        <option value="Banking">Banking</option>
                        <option value="Business Management">
                          Business Management
                        </option>
                      </select>
                    </div>

                    <button
                      type="button"
                      className="btn rounded next"
                      onClick={() => nextStep()}
                    >
                      Next
                      <i
                        className="fa fa-arrow-right arrow"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                )}

                {step2 && (
                  <div>
                    <h3 className="almostThere">Almost There...</h3>
                    <br />

                    <div className="form-outline mb-3">
                      <label
                        className="form-label"
                        form="form3Example3"
                        id="phoneNumber"
                      >
                        Site URL
                      </label>
                      <input
                        type="text"
                        id="form3Example3"
                        className="form-control form-control-lg"
                        placeholder="Site URL"
                        name="siteUrl"
                        onChange={handleCompanyRegistrationFormChange}
                      />
                    </div>

                    <div className="form-outline mb-3">
                      <label
                        className="form-label"
                        form="form3Example3"
                        id="email"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="form-control form-control-lg"
                        placeholder="Email"
                        name="email"
                        onChange={handleCompanyRegistrationFormChange}
                      />
                    </div>

                    <div className="form-outline mb-3">
                      <label
                        className="form-label"
                        form="form3Example3"
                        id="password"
                      >
                        Password
                      </label>
                      <input
                        type={passwordShown ? "text" : "password"}
                        id="form3Example3"
                        className="form-control form-control-lg"
                        placeholder="Password"
                        name="password"
                        onChange={handleCompanyRegistrationFormChange}
                      />
                      <span className="p-viewer">
                        <i
                          id="eyeIcon"
                          className={`fa ${
                            passwordShown ? "fa-eye" : "fa-eye-slash"
                          } password-icon`}
                          onClick={togglePasswordVisibility}
                        >
                          {" "}
                        </i>
                      </span>
                    </div>
                    <PasswordStrengthMeter password={password} />
                    <div className="form-outline mb-3">
                      <label
                        className="form-label"
                        form="form3Example3"
                        id="password"
                      >
                        Confirm Password
                      </label>
                      <input
                        type={confirmPasswordShown ? "text" : "password"}
                        id="form3Example3"
                        className="form-control form-control-lg"
                        placeholder="Confirm Password"
                      />
                      <span className="p-viewer">
                        <i
                          id="eyeIcon"
                          className={`fa ${
                            confirmPasswordShown ? "fa-eye" : "fa-eye-slash"
                          } password-icon`}
                          onClick={toggleConfirmPasswordVisibility}
                        >
                          {" "}
                        </i>
                      </span>
                    </div>

                    <button
                      type="button"
                      className="btn rounded signupBtn"
                      onClick={handleSignUp}
                    >
                      Sign Up
                    </button>
                    <p className="back">
                      <a onClick={navigateBack}> Back</a>
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

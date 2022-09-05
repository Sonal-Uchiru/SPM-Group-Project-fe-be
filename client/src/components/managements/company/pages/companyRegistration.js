import React, {useState} from "react";
import "../css/companyRegistration.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-solid-svg-icons";
import {faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {PasswordStrengthMeter} from "../../../external_components/validations/passwordStrengthIndecator";
import {uploadFile} from "../../../../firebase/uploadFile";
import {ErrorAlert} from "../../../../sweet_alerts/error";
import {isPasswordComplex} from "../../../external_components/validations/passwordStrengthIndecator";
import {createCompany} from "../../../../api/managements/companyAPI";
import {SuccessAlert} from "../../../../sweet_alerts/success";
import {useNavigate} from "react-router";
import {App_Routes} from "../../../../constant/appRoutes";

const eye = <FontAwesomeIcon icon={faEye}/>;
const sleye = <FontAwesomeIcon icon={faEyeSlash}/>;

export default function CompanyRegistration() {
    const [passwordShown, setPasswordShown] = useState(false);
    const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
    const [step1, setStep1] = useState(true);
    const [step2, setStep2] = useState(false);
    const [imgData, setImgData] = useState("");
    const [picture, setPicture] = useState("");
    let [placeHolder, setPlaceHolder] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const [company, setCompany] = useState({
        name: "",
        logo: imgData,
        email: "",
        address: "",
        field: "",
        password: "",
        mobile: "",
        siteUrl: "",
    });

    const handleCompanyRegistrationFormChange = (e) => {
        setCompany((prev) => ({...prev, [e.target.name]: e.target.value}));
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

    const handleSignUp = async () => {
        if (!isPasswordComplex(company.password)) {
            await ErrorAlert("Not a Strong Password!");
            return;
        } else if (company.password !== confirmPassword) {
            await ErrorAlert("Password Mismatch!");
            return;
        } else {
            let imageUrl = "";

            if (picture !== "") {
                imageUrl = await uploadFile(picture, "companyProfilePictures");
            }

            const companyPayload = {
                name: company.name,
                logo: imageUrl,
                email: company.email,
                address: company.address,
                field: company.field,
                password: company.password,
                mobile: company.mobile,
                siteUrl: company.siteUrl,
            };

            try {
                const content = await createCompany(companyPayload);

                if (content) {
                    await SuccessAlert("Successfully Created Account!");
                    navigate(App_Routes.ROOT)
                }
            } catch (e) {
                if (e.response.status === 409) {
                    await ErrorAlert("Email already exists!");
                    return;
                }
                await ErrorAlert("Something went wrong!");
            }
        }
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
                            <br/>
                            <br/>
                            <h2 className="text-center quote">
                                “The only way to do great work is to do what you love. If you
                                haven’t found it yet, keep looking, Don’t settle.”{" "}
                            </h2>
                            <br/>
                        </div>

                        <br/>

                        <div className="col-md-8 col-lg-6 col-xl-5 offset-xl-1 rightSide">
                            <h1 className="signup">Start Hiring</h1>
                            <br/>
                            <form>
                                {step1 && (
                                    <div>
                                        <br/>
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
                                        <br/>

                                        <div className="form-outline mb-3">
                                            <label
                                                className="form-label"
                                                form="form3Example3"
                                                id="companyName"
                                            >
                                                Company Name
                                                <mark className="required-icon">
                                                    *
                                                </mark>
                                            </label>
                                            <input
                                                type="text"
                                                id="companyName"
                                                name="name"
                                                onChange={handleCompanyRegistrationFormChange}
                                                className="form-control form-control-lg"
                                                placeholder="Company Name"
                                                required
                                            />
                                        </div>

                                        <div className="form-outline mb-3">
                                            <label
                                                className="form-label"
                                                form="form3Example3"
                                                id="phoneNumber"
                                            >
                                                Phone Number
                                                <mark className="required-icon">
                                                    *
                                                </mark>
                                            </label>
                                            <input
                                                type=""
                                                id="form3Example3"
                                                className="form-control form-control-lg"
                                                placeholder="Phone Number"
                                                name="mobile"
                                                onChange={handleCompanyRegistrationFormChange}
                                                required
                                            />
                                        </div>

                                        <div className="form-outline mb-3">
                                            <label
                                                className="form-label"
                                                form="form3Example3"
                                                id="address"
                                            >
                                                Address
                                                <mark className="required-icon">
                                                    *
                                                </mark>
                                            </label>
                                            <input
                                                type="text"
                                                id="address"
                                                className="form-control form-control-lg"
                                                placeholder="Address"
                                                name="address"
                                                onChange={handleCompanyRegistrationFormChange}
                                                required
                                            />
                                        </div>

                                        <div className="form-outline mb-3">
                                            <label
                                                className="form-label"
                                                form="form3Example3"
                                                id="field"
                                            >
                                                Field
                                                <mark className="required-icon">
                                                    *
                                                </mark>
                                            </label>
                                            <select
                                                className="form-select mb-3"
                                                aria-label=".form-select-lg example"
                                                name="field"
                                                onChange={handleCompanyRegistrationFormChange}
                                                required
                                            >
                                                <option selected disabled>
                                                    Select a Field
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
                                        <br/>
                                        <div className="text-center">
                                            <a href="/" className="link-primary backToLogin"><b>Back to Login</b></a>
                                        </div>
                                    </div>
                                )}

                                {step2 && (
                                    <div>
                                        <h3 className="almostThere">Almost There...</h3>
                                        <br/>

                                        <div className="form-outline mb-3">
                                            <label
                                                className="form-label"
                                                form="form3Example3"
                                                id="phoneNumber"
                                            >
                                                Site URL
                                                <mark className="required-icon">
                                                    *
                                                </mark>
                                            </label>
                                            <input
                                                type="url"
                                                id="form3Example3"
                                                className="form-control form-control-lg"
                                                placeholder="Site URL"
                                                name="siteUrl"
                                                onChange={handleCompanyRegistrationFormChange}
                                                required
                                            />
                                        </div>

                                        <div className="form-outline mb-3">
                                            <label
                                                className="form-label"
                                                form="form3Example3"
                                                id="email"
                                            >
                                                Email
                                                <mark className="required-icon">
                                                    *
                                                </mark>
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                className="form-control form-control-lg"
                                                placeholder="Email"
                                                name="email"
                                                onChange={handleCompanyRegistrationFormChange}
                                                required
                                            />
                                        </div>

                                        <div className="form-outline mb-3">
                                            <label
                                                className="form-label"
                                                form="form3Example3"
                                                id="password"
                                            >
                                                Password
                                                <mark className="required-icon">
                                                    *
                                                </mark>
                                            </label>
                                            <input
                                                type={passwordShown ? "text" : "password"}
                                                id="form3Example3"
                                                className="form-control form-control-lg"
                                                placeholder="Password"
                                                name="password"
                                                onChange={handleCompanyRegistrationFormChange}
                                                required
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
                                        <PasswordStrengthMeter password={company.password}/>
                                        <div className="form-outline mb-3">
                                            <label
                                                className="form-label"
                                                form="form3Example3"
                                                id="password"
                                            >
                                                Confirm Password
                                                <mark className="required-icon">
                                                    *
                                                </mark>
                                            </label>
                                            <input
                                                type={confirmPasswordShown ? "text" : "password"}
                                                id="form3Example3"
                                                className="form-control form-control-lg"
                                                placeholder="Confirm Password"
                                                required
                                                onChange={(e) => {
                                                    setConfirmPassword(e.target.value);
                                                }}
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

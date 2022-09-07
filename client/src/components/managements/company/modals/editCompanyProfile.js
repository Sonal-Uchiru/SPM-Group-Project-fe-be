import React, { useState, useEffect, useRef } from "react";
import { Button, Modal } from "react-bootstrap";
import "../css/editCompanyProfile.css";
import {
  getCompany,
  updateCompany,
} from "../../../../api/managements/companyAPI";
import Loading from "../../../external_components/spinners/loading";
import { uploadFile } from "../../../../firebase/uploadFile";
import { ErrorAlert } from "../../../../sweet_alerts/error";
import { SuccessAlert } from "../../../../sweet_alerts/success";

export default function EditCompanyProfile(props) {
  const [imgData, setImgData] = useState("");
  const [picture, setPicture] = useState("");
  const [loading, setLoading] = useState(false);
  let [placeHolder, setPlaceHolder] = useState(false);

  const [imgData2, setImgData2] = useState("");
  const [picture2, setPicture2] = useState("");
  let [placeHolder2, setPlaceHolder2] = useState(false);

  const profilePictureRef = useRef(null);
  const coverPictureRef = useRef(null);

  const [company, setCompany] = useState({
    name: "",
    logo: imgData,
    email: "",
    address: "",
    field: "",
    password: "",
    mobile: "",
    siteUrl: "",
    description: "",
    moto: "",
    coverImage: "",
  });

  const handleEditCompanyFormOnChange = (e) => {
    setCompany((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    const getCompanyDetails = async () => {
      const companyData = await getCompany();

      setCompany(companyData.data);
    };
    getCompanyDetails();
  }, []);

  const onChangeProfilePicture = (e) => {
    console.log("Profile Picture");

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

  const onChangeCoverPicture = (e) => {
    console.log("Cover Picture");

    if (e.target.files[0]) {
      setPlaceHolder2(true);
      setPicture2(e.target.files);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData2(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleEditCompany = async () => {
    try {
      setLoading(true);

      let imageUrl = "";

      if (picture !== "") {
        imageUrl = await uploadFile(picture, "companyProfilePictures");
      }

      let coverImageUrl = "";

      if (picture2 !== "") {
        coverImageUrl = await uploadFile(picture2, "companyCoverPictures");
      }

      const companyPayload = {
        name: company.name,
        logo: imageUrl === "" ? (company.logo ? company.logo : "") : imageUrl,
        email: company.email,
        address: company.address,
        field: company.field,
        mobile: company.mobile,
        siteUrl: company.siteUrl,
        description: company.description ? company.description : "",
        moto: company.moto ? company.moto : "",
        coverImage:
          coverImageUrl === ""
            ? company.coverImage
              ? company.coverImage
              : ""
            : coverImageUrl,
      };

      const cleanedCompanyPayload = Object.fromEntries(
        Object.entries(companyPayload).filter(([_, v]) => v !== "")
      );

      const content = await updateCompany(cleanedCompanyPayload);

      if (content) {
        await SuccessAlert("Successfully Updated Your Company Profile!");
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.response.status === 409) {
        await ErrorAlert("Email already exists");
        return;
      }
      await ErrorAlert("Something went wrong!");
    }
  };

  return (
    <>
      <div className="editCompanyProfile">
        <div className="modal">
          <Modal show={true} size="lg">
            <Modal.Header>
              <div>
                <h4 className="ms-4 modal-title">
                  <b>Edit Company </b>
                </h4>
              </div>
              <button
                type="button"
                className="btn"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  props.closeModal();
                }}
              >
                <span aria-hidden="true">
                  <b>&times;</b>
                </span>
              </button>
            </Modal.Header>
            <Modal.Body>
              <div className="edit-company-profile">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleEditCompany();
                  }}
                >
                  <div className="coverImage">
                    <img
                      src={
                        company.coverImage && company.coverImage.length === 0
                          ? company.coverImage
                          : `./images/cover.jpeg`
                      }
                      className="cover"
                      alt="cover_image"
                      hidden={placeHolder2}
                    />
                    <img
                      src={imgData2}
                      className="cover img-fluid"
                      alt="cover_image"
                      data-holder-rendered="true"
                      hidden={!placeHolder2}
                    />
                    <div className="d-flex justify-content-end">
                      <div className="image-upload">
                        <label htmlFor="file-input">
                          <img
                            src="./images/gallery.png"
                            className="Img2"
                            // id="image-upload-btn2"
                            alt="upload_image"
                            onClick={() => {
                              coverPictureRef.current.click();
                            }}
                          />
                        </label>
                        <input
                          // id="file-input"
                          type="file"
                          onChange={onChangeCoverPicture}
                          ref={coverPictureRef}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <br />
                    <span>
                      <center>
                        <div className="box">
                          <img
                            className="z-depth-2 Img1"
                            alt="company_logo"
                            src={
                              company.logo
                                ? company.logo
                                : `./images/logo-placeholder-image-modified.png`
                            }
                            data-holder-rendered="true"
                            hidden={placeHolder}
                          />

                          <img
                            className="z-depth-2 Img1"
                            alt="company_logo"
                            src={imgData}
                            id="companyLogo"
                            data-holder-rendered="true"
                            hidden={!placeHolder}
                          />

                          <div className="image-upload">
                            <label htmlFor="file-input">
                              <img
                                src="./images/gallery.png"
                                className="Img2"
                                // id="image-upload-btn"
                                alt="upload_image"
                                onClick={() => {
                                  profilePictureRef.current.click();
                                }}
                              />
                            </label>
                            <input
                              // id="file-input2"
                              type="file"
                              onChange={onChangeProfilePicture}
                              ref={profilePictureRef}
                            />
                          </div>
                        </div>
                      </center>
                    </span>
                    <br />

                    <div className="editCompanyProfileForm">
                      <h3 className="blue-text-color">Company Details</h3>
                      <div className="row">
                        <div className="col-sm">
                          <div className="mb-2">
                            <label
                              htmlFor="exampleInputEmail1"
                              className="form-label"
                            >
                              Name
                              <mark className="required-icon">*</mark>
                            </label>
                            <input
                              type="text"
                              className="form-control custom-input-fields"
                              id="company_name"
                              placeholder="Company Name"
                              Value={company.name}
                              name="name"
                              onChange={handleEditCompanyFormOnChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col">
                          <div className="mb-2">
                            <label
                              htmlFor="exampleInputEmail1"
                              className="form-label"
                            >
                              Field
                              <mark className="required-icon">*</mark>
                            </label>
                            <select
                              className="form-select mb-3"
                              aria-label=".form-select-lg example"
                              value={company.field}
                              name="field"
                              onChange={handleEditCompanyFormOnChange}
                              required
                            >
                              <option selected value="Information Technology">
                                Information Technology
                              </option>
                              <option value="Banking">Banking</option>
                              <option value="Business Management">
                                Business Management
                              </option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="form-outline mb-3">
                        <label
                          className="form-label"
                          form="form3Example3"
                          id="email"
                        >
                          Email
                          <mark className="required-icon">*</mark>
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="form3Example3"
                          className="form-control form-control-lg"
                          placeholder="Email"
                          Value={company.email}
                          onChange={handleEditCompanyFormOnChange}
                          required
                        />
                      </div>

                      <div className="form-outline mb-3">
                        <label
                          className="form-label"
                          form="form3Example3"
                          id="address"
                          name="address"
                        >
                          Address
                          <mark className="required-icon">*</mark>
                        </label>
                        <input
                          type="text"
                          id="address"
                          className="form-control form-control-lg"
                          placeholder="Address"
                          Value={company.address}
                          onChange={handleEditCompanyFormOnChange}
                          required
                        />
                      </div>

                      <div className="form-outline mb-3">
                        <label
                          className="form-label"
                          form="form3Example3"
                          id="phone"
                        >
                          Phone Number
                          <mark className="required-icon">*</mark>
                        </label>
                        <input
                          type="number"
                          id="phone"
                          name="mobile"
                          className="form-control form-control-lg"
                          placeholder="Phone Number"
                          Value={company.mobile}
                          onChange={handleEditCompanyFormOnChange}
                          required
                        />
                      </div>

                      <div className="form-outline mb-3">
                        <label
                          className="form-label"
                          form="form3Example3"
                          id="moto"
                        >
                          Moto
                        </label>
                        <input
                          type="text"
                          id="moto"
                          name="moto"
                          className="form-control form-control-lg"
                          placeholder="Moto"
                          Value={company.moto}
                          onChange={handleEditCompanyFormOnChange}
                        />
                      </div>

                      <div className="form-outline mb-3">
                        <label
                          className="form-label"
                          form="form3Example3"
                          id="description"
                        >
                          Description
                        </label>
                        <textarea
                          className="form-control"
                          id="description"
                          name="description"
                          rows="2"
                          placeholder="A Small description about your company..."
                          Value={company.description}
                          onChange={handleEditCompanyFormOnChange}
                        />
                      </div>

                      <div className="form-outline mb-3">
                        <label
                          className="form-label"
                          form="form3Example3"
                          id="url"
                        >
                          Website URL
                          <mark className="required-icon">*</mark>
                        </label>
                        <input
                          type="url"
                          id="url"
                          className="form-control form-control-lg"
                          placeholder="Website URL"
                          name="siteUrl"
                          Value={company.siteUrl}
                          required
                          onChange={handleEditCompanyFormOnChange}
                        />
                      </div>
                    </div>
                    {loading && <Loading />}
                    <div className="text-center mt-3">
                      <Button
                        type="button"
                        className="btn btn-primary changePswButton"
                        onClick={() => {
                          props.openChangePassword();
                        }}
                      >
                        Change Password
                      </Button>
                    </div>
                    <div className="text-center mt-1">
                      <div className="btn-group me-2">
                        <button
                          type="submit"
                          className="btn btn-primary saveButton"
                        >
                          Save Changes
                        </button>
                      </div>
                      <div className="btn-group me-2">
                        <button
                          type="button"
                          className="btn btn-primary cancelButton"
                          onClick={() => {
                            props.closeModal();
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </>
  );
}

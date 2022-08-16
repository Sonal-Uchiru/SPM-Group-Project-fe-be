import React, {useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import '../css/editCompanyProfile.css'
import PasswordStrengthMeter from "../../../external_components/validations/passwordStrengthIndecator";

export default function EditCompanyProfile() {

    const [openModal, setOpenModal] = useState(true)
    const [imgData, setImgData] = useState('')
    const [picture, setPicture] = useState('')
    let [placeHolder, setPlaceHolder] = useState(false)

    const [imgData2, setImgData2] = useState('')
    const [picture2, setPicture2] = useState('')
    let [placeHolder2, setPlaceHolder2] = useState(false)

    const onChangePicture = (e) => {
        if (e.target.files[0]) {
            setPlaceHolder(true)
            setPicture(e.target.files)
            const reader = new FileReader()
            reader.addEventListener('load', () => {
                setImgData(reader.result)
            })
            reader.readAsDataURL(e.target.files[0])
        }
    }

    const onChangePicture2 = (e) => {
        if (e.target.files[0]) {
            setPlaceHolder2(true)
            setPicture2(e.target.files)
            const reader = new FileReader()
            reader.addEventListener('load', () => {
                setImgData2(reader.result)
            })
            reader.readAsDataURL(e.target.files[0])
        }
    }

    return (
        <div className="editCompanyProfile">
            <div>
                <button
                    type="button"
                    onClick={() => {
                        setOpenModal(true)
                    }}
                    className="primary"
                >
                    Edit Profile

                </button>
            </div>
            <div className="modal">
                <Modal show={openModal} size="lg">
                    <Modal.Header>
                        <div>
                            <h4 className="ms-4 modal-title"><b>Edit Company </b>
                            </h4>
                        </div>
                        <button
                            type="button"
                            className="btn"
                            data-dismiss="modal"
                            aria-label="Close"
                            onClick={() => {
                                setOpenModal(false);
                            }}
                        >
                            <span aria-hidden="true"><b>&times;</b></span>
                        </button>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="edit-company-profile">
                            <form className="">
                                <div className="coverImage">
                                    <img src="./images/cover.jpeg" className="cover" alt="cover_image"
                                         hidden={placeHolder2}/>
                                    <img src={imgData2} className="cover img-fluid" alt="cover_image"
                                         data-holder-rendered='true'
                                         hidden={!placeHolder2}/>
                                    <div className="d-flex justify-content-end">
                                        <div className='image-upload'>
                                            <label htmlFor='file-input'>
                                                <img
                                                    src='./images/gallery.png'
                                                    className='Img2'
                                                    id='image-upload-btn2'
                                                    alt='upload_image'
                                                />
                                            </label>
                                            <input
                                                id='file-input'
                                                type='file'
                                                onChange={onChangePicture2}
                                            />
                                        </div>
                                    </div>

                                </div>
                                <div>
                                    <br/>
                                    <span>
                    <center>
                      <div className='box'>
                        <img
                            className='z-depth-2 Img1'
                            alt='company_logo'
                            src='./images/calcey-logo-1-1.jpeg'
                            data-holder-rendered='true'
                            hidden={placeHolder}
                        />

                        <img
                            className='z-depth-2 Img1'
                            alt='company_logo'
                            src={imgData}
                            id='companyLogo'
                            data-holder-rendered='true'
                            hidden={!placeHolder}
                        />

                        <div className='image-upload'>
                          <label htmlFor='file-input'>
                            <img
                                src='./images/gallery.png'
                                className='Img2'
                                id='image-upload-btn'
                                alt='upload_image'
                            />
                          </label>
                          <input
                              id='file-input'
                              type='file'
                              onChange={onChangePicture}
                          />
                        </div>
                      </div>
                    </center>
                  </span>
                                    <br/>

                                    <div className="editCompanyProfileForm">
                                        <h3 className="blue-text-color">Company Details</h3>
                                        <div className="row">
                                            <div className="col-sm">
                                                <div className="mb-2">
                                                    <label htmlFor="exampleInputEmail1" className="form-label">
                                                        Name
                                                        <mark className="required-icon">
                                                            *
                                                        </mark>

                                                    </label>
                                                    <input type="text" className="form-control custom-input-fields"
                                                           id="company_name"
                                                           placeholder="Company Name"/>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="mb-2">
                                                    <label htmlFor="exampleInputEmail1" className="form-label">
                                                        Field
                                                        <mark className="required-icon">
                                                            *
                                                        </mark>
                                                    </label>
                                                    <select
                                                        className='form-select mb-3'
                                                        aria-label='.form-select-lg example'
                                                    >
                                                        <option selected value='Information Technology'>Information
                                                            Technology
                                                        </option>
                                                        <option value='Banking'>Banking</option>
                                                        <option value='Business Management'>Business Management</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='form-outline mb-3'>
                                            <label
                                                className='form-label'
                                                form='form3Example3'
                                                id='email'
                                            >
                                                Email
                                                <mark className="required-icon">
                                                    *
                                                </mark>
                                            </label>
                                            <input
                                                type='email'
                                                id='form3Example3'
                                                className='form-control form-control-lg'
                                                placeholder='Email'
                                            />
                                        </div>

                                        <div className='form-outline mb-3'>
                                            <label
                                                className='form-label'
                                                form='form3Example3'
                                                id='address'
                                            >
                                                Address
                                                <mark className="required-icon">
                                                    *
                                                </mark>
                                            </label>
                                            <input
                                                type='text'
                                                id='address'
                                                className='form-control form-control-lg'
                                                placeholder='Address'
                                            />
                                        </div>

                                        <div className='form-outline mb-3'>
                                            <label
                                                className='form-label'
                                                form='form3Example3'
                                                id='phone'
                                            >
                                                Phone Number
                                                <mark className="required-icon">
                                                    *
                                                </mark>
                                            </label>
                                            <input
                                                type='text'
                                                id='phone'
                                                className='form-control form-control-lg'
                                                placeholder='Phone Number'
                                            />
                                        </div>

                                        <div className='form-outline mb-3'>
                                            <label
                                                className='form-label'
                                                form='form3Example3'
                                                id='moto'
                                            >
                                                Moto
                                            </label>
                                            <input
                                                type='text'
                                                id='moto'
                                                className='form-control form-control-lg'
                                                placeholder='Moto'
                                            />
                                        </div>

                                        <div className='form-outline mb-3'>
                                            <label
                                                className='form-label'
                                                form='form3Example3'
                                                id='description'
                                            >
                                                Description
                                            </label>
                                            <textarea className="form-control" id="description" rows="2"
                                                      placeholder='A Small description about your company...'/>
                                        </div>

                                        <div className='form-outline mb-3'>
                                            <label
                                                className='form-label'
                                                form='form3Example3'
                                                id='url'
                                            >
                                                Website URL
                                                <mark className="required-icon">
                                                    *
                                                </mark>
                                            </label>
                                            <input
                                                type='text'
                                                id='url'
                                                className='form-control form-control-lg'
                                                placeholder='Website URL'
                                            />
                                        </div>
                                    </div>
                                    <div className="text-center mt-3">
                                        <Button type="button" className="btn btn-primary changePswButton">Change
                                            Password</Button>
                                    </div>
                                    <div className="text-center mt-1">
                                        <div className="btn-group me-2">
                                            <button type="button" className="btn btn-primary saveButton">Save Changes
                                            </button>
                                        </div>
                                        <div className="btn-group me-2">
                                            <button type="button" className="btn btn-primary cancelButton">Cancel
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
    );
}

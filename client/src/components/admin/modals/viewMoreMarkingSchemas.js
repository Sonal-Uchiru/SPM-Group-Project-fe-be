import React, {useEffect, useState} from 'react'
import Modal from "react-bootstrap/Modal";
import "../css/viewMoreSchemas.css";
import axios from 'axios'
import showAlerts from '../../external_components/sweetAlerts'
import {getTokenFromLocalStorage} from '../../external_components/tokenHandling'

export default function ViewMoreMarkingSchemasModal(props) {

    let [openModal, setOpenModal] = useState(false);
    let [schemaDetails, setSchemaDetails] = useState([]);
    let [schemaList, setSchemaList] = useState([]);
    let [error, setError] = useState("")
    let marks = 0;

    const typeID = props.submissionType
    const markingSchemeID = props.schemaID


    useEffect(() => {
        getSchemaDetails()

    }, [])

    async function getSchemaDetails() {
        await axios({
            url: `http://localhost:8080/api/markingSchemes/${markingSchemeID}`,
            method: "GET",
            headers: {Authorization: "Bearer " + getTokenFromLocalStorage()}
        }).then((res) => {
            console.log(res.data.markingScheme[0])

            if (res.data.markingScheme[0].distributionList.length > 0) {
                setSchemaList(res.data.markingScheme[0].distributionList)
                setError('')
            } else {
                setError('No marking schemas available')
            }
            setSchemaDetails(res.data.markingScheme[0])

        }).catch((err) => {
            showAlerts(2, err)
        })
    }

    return (
        <div className="view-more-marking-schemas">
            <div>
                <button
                    type="button"
                    id={typeID}
                    onClick={() => setOpenModal(true)}
                    className="btn modal-open-btn shadow-lg d-none"
                >
                    View More Marking Schemas
                </button>
            </div>
            <div className="modal">
                <Modal show={openModal} size="lg">
                    <Modal.Header>
                        <span> </span>

                        <button
                            type="button"
                            className="btn close-btn"
                            data-dismiss="modal"
                            aria-label="Close"
                            onClick={() => {
                                setOpenModal(false);
                            }}
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            <h3 className="proposal-title"> {schemaDetails.name} </h3>

                            <table className="table border border-dark text-center">
                                <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Criteria</th>
                                    <th scope="col">Marks</th>
                                </tr>
                                </thead>
                                <tbody>
                                {schemaList.map((post, i, max) => {
                                    marks = marks + post.mark
                                    return (
                                        <tr>
                                            <td>{i + 1}</td>
                                            <td>{post.criteria}</td>
                                            <td>{post.mark}</td>
                                        </tr>
                                    )
                                })}

                                </tbody>
                            </table>
                            <h5 className="text-danger d-flex justify-content-center">{error}</h5>
                            <h2 className="totalMarks marks-area">Total Marks</h2>
                            <h2 className="marks marks-area">{marks}</h2>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    );
}

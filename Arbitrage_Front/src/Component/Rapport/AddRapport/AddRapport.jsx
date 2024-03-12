import React, { useState } from "react";
import axios from "axios";
import { Avert } from "./Avert";
import { Changement } from "./Changment";
import { Matche } from "./Matche"
import { Buts } from "./Buts";
import { useNavigate } from "react-router-dom";
import { axiosClinet } from "../../../Api/axios";


function AddRapport() {

    const [dataAvert, setDataAvert] = useState();
    const [dataMatche, setDataMatche] = useState();
    const [dataChangement, setDataChangement] = useState();
    const [dataButs, setDataButs] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault()
        setLoading(true)
            if (dataMatche) {
                await axiosClinet.post('api/matche', dataMatche).then(
                    (response) => {
                        const { status } = response;
                        if (status === 200) {
                            setLoading(false)
                            navigate('/addedRapport')
                        }
                    }
                ).catch((response) => {
                    setLoading(false)
                    console.log(response)
                })
            }else{
                setLoading(false)
            }
            if (dataAvert) {
                await axiosClinet.post('api/avertissement', dataAvert).then(
                    (response) => {
                        const { status } = response;
                        if (status === 200) {
                            setLoading(false)
                            // navigate('/addedRapport')
                        }
                    }
                ).catch((response) => {
                    setLoading(false)
                    console.log(response)
                })
            }
            if (dataChangement) {
                await axiosClinet.post('api/changement', dataChangement).then(
                    (response) => {
                        const { status } = response;
                        if (status === 200) {
                            setLoading(false)
                        }
                    }
                ).catch((response) => {
                    setLoading(false)
                    console.log(response)
                })
            }
            if (dataButs) {
                await axiosClinet.post('api/but', dataButs).then(
                    (response) => {
                        const { status } = response;
                        if (status === 200) {
                            setLoading(false)
                            // navigate('/addedRapport')
                        }
                    }
                ).catch((response) => {
                    setLoading(false)
                    console.log(response)
                })
            }
    }

    const handleAvertData = (dataFromChild) => {
        setDataAvert(dataFromChild);
    }
    console.log("dataAvert", dataAvert)

    const handleMatcheData = (dataFromChild) => {
        setDataMatche(dataFromChild);
    }
    console.log("dataMatche", dataMatche)

    const handleChangementData = (dataFromChild) => {
        setDataChangement(dataFromChild);
    }
    console.log("dataChangement", dataChangement)

    const handleButsData = (dataFromChild) => {
        setDataButs(dataFromChild);
    }
    console.log("dataButs", dataButs)

    console.log(dataAvert)

    return (
        <>
            <div className="bg-dark p-4">
                <div class="card-header bg-secondary border border-light">
                    <p class=" mt-2 text-light text-center fs-3 fw-bold mb-1">إضافة تقرير</p>
                </div>
                <div className="addRapport px-lg-5 py-3 rounded-bottom bg-light">
                    <Matche dataMatche={handleMatcheData} />
                    <Avert dataAvert={handleAvertData} />
                    <Changement dataChangement={handleChangementData} />
                    <Buts dataButs={handleButsData} />
                    <form onSubmit={handleSubmit}>
                        <div className="d-flex justify-content-center">
                            <div>
                            <button type="submit" onChange={handleSubmit} className="btn btn-outline-warning px-5 py-2 fw-bold">إضـافـــــــة
                                {loading ? (
                                    <div className="spinner-border spinner-border-sm me-3 fs-2" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>) : ''}
                            </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddRapport;
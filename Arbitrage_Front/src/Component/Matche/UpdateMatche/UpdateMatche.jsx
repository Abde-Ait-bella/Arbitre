import React, { useState } from "react";
import { Avert } from "./Avert";
import { Changement } from "./Changment";
import { Matche } from "./Matche"
import { Buts } from "./Buts";
import { useParams, useNavigate } from "react-router-dom";
import { axiosClinet } from "../../../Api/axios";
import "../../../style/Matche/updateMatche.scss"


function AddMatche() {

    const { id } = useParams();
    const navigate = useNavigate();
    

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (dataMatche) {
            setLoading(true)
            await axiosClinet.put(`/matche/${id}`, dataMatche).then(
                (response) => {
                    const { data } = response;
                    if (data.status == true) {
                        setLoading(false)
                        navigate('/updatedMatche')
                    }
                }
            ).catch((response) => {
                setLoading(false)
                console.log(response)
            })
        }
        if (dataAvert) {
            setLoading(true)
            console.log(id)
            await axiosClinet.put(`/avertissement/${id}`, dataAvert).then(
                (response) => {
                    const { data } = response;
                    console.log(response)
                    if (data.status == true) {
                        setLoading(false)
                    }
                }
            ).catch((response) => {
                console.log(response)
                setLoading(false)
            })
        }
        if (dataChangement) {
            setLoading(true)
            await axiosClinet.put(`/changement/${id}`, dataChangement).then(
                (response) => {
                    const { data } = response;
                    if (data.status == true) {
                        setLoading(false)
                    }
                }
            ).catch((response) => {
                setLoading(false)
                console.log(response)
            })
        }
        if (dataButs) {
            setLoading(true)
            await axiosClinet.put(`/but/${id}`, dataButs).then(
                (response) => {
                    const { data } = response;
                    if (data.status == true) {
                        setLoading(false)
                    }
                }
            ).catch((response) => {
                setLoading(false)
                console.log(response)
            })
        }
    }

    const [dataAvert, setDataAvert] = useState();
    const [dataMatche, setDataMatche] = useState();
    const [dataChangement, setDataChangement] = useState();
    const [dataButs, setDataButs] = useState();
    const [loading, setLoading] = useState(false);

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

    return (
        <div className="bg-dark p-4">
            <div class="card-header bg-secondary border border-light">
                <p class=" mt-2 text-light text-center fs-3 fw-bold mb-1">تعديل التقرير</p>
            </div>
            <div className="addRapport px-lg-5 py-3 rounded-bottom bg-light">

                <Matche dataMatche={handleMatcheData} />
                <Avert dataAvert={handleAvertData} />
                <Changement dataChangement={handleChangementData} />
                <Buts dataButs={handleButsData} />

                <form onSubmit={handleSubmit}>
                    <div className="d-flex justify-content-center">
                        <div>
                            <button type="submit" onChange={handleSubmit} className="btn btn-outline-warning px-5 py-2 fw-bold">التعديـــل
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
    )
}
export default AddMatche;
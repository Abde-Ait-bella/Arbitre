import React, { useState } from "react";
import axios from "axios";
import { Avert } from "./Avert";
import { Changement } from "./Changment";
import { Matche } from "./Matche"
import { Buts } from "./Buts";
import { useParams, useNavigate } from "react-router-dom";
// import { TestPrint } from "./TestPrint";


function AddMatche() {

    const { id } = useParams();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            if (dataMatche) {
                const responseMatche = axios.put(`http://localhost:8000/api/matche/${id}`, dataMatche);
                console.log('Server response matche:', responseMatche);
                navigate('/updatedMatche')
            } else {
                navigate('/updatedMatche')
            }
            if (dataAvert) {
                const responseAvert = axios.put(`http://localhost:8000/api/avertissement/${id}`, dataAvert);
                console.log('Server response Avert:', responseAvert);
            }
            if (dataChangement) {
                const responseChangement = axios.put(`http://localhost:8000/api/changement/${id}`, dataChangement);
                console.log('Server response changements:', responseChangement);
            }
            if (dataButs) {
                const responseButs = axios.put(`http://localhost:8000/api/but/${id}`, dataButs);
                console.log('Server response Buts:', responseButs);
            }
        } catch (error) {
            console.error('Error axios:', error);
        }
    }

    const [dataAvert, setDataAvert] = useState();
    const [dataMatche, setDataMatche] = useState();
    const [dataChangement, setDataChangement] = useState();
    const [dataButs, setDataButs] = useState();

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
        <div className="bg-dark p-4">
            <div class="card-header bg-secondary border border-light">
                <h4 class=" mt-2 text-light text-center">تعديل التقرير</h4>
            </div>
            <div className="addRapport px-5 py-3 rounded-bottom bg-light">
                {/* <TestPrint /> */}
                <Matche dataMatche={handleMatcheData} />
                <Avert dataAvert={handleAvertData} />
                <Changement dataChangement={handleChangementData} />
                <Buts dataButs={handleButsData} />

                <form onSubmit={handleSubmit}>
                    <div className="d-flex justify-content-center">
                        <div>
                            <button type="submit" onChange={handleSubmit} className="btn btn-outline-warning">Enregistrer</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default AddMatche;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from 'react-router-dom';

function UpdateStade() {

    const [delegues, setDelegue] = useState();
    const [villes, setVilles] = useState();
    const [updateDelegue, setUpdateDelegue] = useState();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        axios.get('http://localhost:8000/api/delegue')
            .then((res) => setDelegue(res.data))
        axios.get('http://localhost:8000/api/ville')
            .then((res) => setVilles(res.data))
    }, [])


    const delegue = delegues?.find((a) => a.id === parseInt(id));

    console.log(updateDelegue);

    const handleUpdateDelegue = (event) => {
        const { name, value } = event.target;
        setUpdateDelegue(prevValues => ({
            ...prevValues,
            [name]: value,
        }))
    }
    const handleUpdateDelegueSelect = (event) => {
        const { name, value } = event.target;
        setUpdateDelegue(prevValues => ({
            ...prevValues,
            [name]: parseInt(value),
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            if (updateDelegue) {
                const responseUpdateDelegue = axios.put(`http://localhost:8000/api/delegue/${id}`, updateDelegue);
                console.log('Server response AddDelegue:', responseUpdateDelegue);
            }
        } catch (error) {
            console.error('Error:', error);
        }
        navigate('/composants/updatedDelegue');
    }




    return (
        <>
            <div className="d-flex justify-content-center my-4">
                <div class="col-sm-12 col-xl-6 text-center">
                    <div class="bg-secondary rounded h-100 p-4">
                        <h4 class="mb-4">تعديل المندوب</h4>
                        <form onSubmit={handleSubmit}>
                            <div class="row mb-3">
                                <label for="inputEmail3" class="col-sm-2 col-form-label"> الاسم</label>
                                <div class="col-sm-10">
                                    <input name="prenom" value={updateDelegue ? updateDelegue?.prenom : delegue?.prenom} onChange={handleUpdateDelegue} type="text" class="form-control" id="inputEmail3" />
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="inputEmail3" class="col-sm-2 col-form-label"> النسب</label>
                                <div class="col-sm-10">
                                    <input name="nom" value={updateDelegue ? updateDelegue?.nom : delegue?.nom} onChange={handleUpdateDelegue} type="text" class="form-control" id="inputEmail3" />
                                </div>
                            </div>
                            <select name="ville_id" onChange={handleUpdateDelegueSelect} class="form-select mb-3" aria-label="Default select example">
                                <option selected disabled>المدينة</option>
                                {villes?.map((v) =>
                                    <option selected={delegue?.ville_id === v.id} key={v.id} value={v.id}>{v.nom}</option>
                                )}
                            </select>
                            <div className="d-flex justify-content-between">
                                <Link to="/composants/delegue" class="btn btn-danger pe-3 pt-1 mt-3"> رجوع<i class="fa-solid fa-caret-right me-4"></i></Link>
                                <button type="submit" class="btn btn-danger mt-3">تعديل <i class="fa-solid fa-circle-check me-3"></i></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default UpdateStade;
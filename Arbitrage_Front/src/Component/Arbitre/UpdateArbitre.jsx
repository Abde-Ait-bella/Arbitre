import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from 'react-router-dom';

function UpdateStade() {

    const [arbitres, setArbitres] = useState();
    const [villes, setVilles] = useState();
    const [updateArbitre, setUpdateArbitre] = useState();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        axios.get('http://localhost:8000/api/arbitre')
            .then((res) => setArbitres(res.data))
        axios.get('http://localhost:8000/api/ville')
            .then((res) => setVilles(res.data))
    }, [])


    const arbitre = arbitres?.find((a) => a.id === parseInt(id));

    console.log(updateArbitre);

    const handleUpdateArbitre = (event) => {
        const { name, value } = event.target;
        setUpdateArbitre(prevValues => ({
            ...prevValues,
            [name]: value,
        }))
    }
    const handleUpdateArbitreSelect = (event) => {
        const { name, value } = event.target;
        setUpdateArbitre(prevValues => ({
            ...prevValues,
            [name]: parseInt(value),
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            if (updateArbitre) {
                const responseUpdateArbitre = axios.put(`http://localhost:8000/api/arbitre/${id}`, updateArbitre);
                console.log('Server response AddStade:', responseUpdateArbitre);
                navigate('/composants/updatedArbitre');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }




    return (
        <>
            <div className="d-flex justify-content-center my-4">
                <div class="col-sm-12 col-xl-6 text-center">
                    <div class="bg-secondary rounded h-100 p-4">
                        <h4 class="mb-4">تعديل الحكم(ة)</h4>
                        <form onSubmit={handleSubmit}>
                            <div class="row mb-3">
                                <label for="inputEmail3" class="col-sm-2 col-form-label"> الاسم</label>
                                <div class="col-sm-10">
                                    <input name="prenom" value={updateArbitre ? updateArbitre?.prenom : arbitre?.prenom} onChange={handleUpdateArbitre} type="text" class="form-control" id="inputEmail3" />
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="inputEmail3" class="col-sm-2 col-form-label"> النسب</label>
                                <div class="col-sm-10">
                                    <input name="nom" value={updateArbitre ? updateArbitre?.nom : arbitre?.nom} onChange={handleUpdateArbitre} type="text" class="form-control" id="inputEmail3" />
                                </div>
                            </div>
                            <select name="ville_id" onChange={handleUpdateArbitreSelect} class="form-select mb-3" aria-label="Default select example">
                                <option selected disabled>المدينة</option>
                                {villes?.map((v) =>
                                    <option selected={arbitre?.ville_id === v.id} key={v.id} value={v.id}>{v.nom}</option>
                                )}
                            </select>
                            <fieldset class="row mb-3">
                                <legend class="col-form-label col-sm-2 pt-1 mb-2">التخصص</legend>
                                <div class="col-md-5 col-sm-10 mt-lg-4 mb-2">
                                    <div class="form-check">
                                        <input class="form-check-input" checked={updateArbitre ? updateArbitre?.type == "center" : arbitre?.type === "center"} onChange={handleUpdateArbitre} type="radio" name="type" id="gridRadios1" value="center" />
                                        <label class="form-check-label" for="gridRadios1">
                                            حكم(ة) الساحة
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" checked={updateArbitre ? updateArbitre?.type == "Assistant" : arbitre?.type === "Assistant"} onChange={handleUpdateArbitre} type="radio" name="type" id="gridRadios2" value="Assistant" />
                                        <label class="form-check-label" for="gridRadios2">
                                            الحكم(ة) المساعد
                                        </label>
                                    </div>
                                </div>
                            </fieldset>
                            <div className="d-flex justify-content-between">
                                <Link to="/composants/arbitres" class="btn btn-danger pe-3 pt-1 mt-3"> رجوع<i class="fa-solid fa-caret-right me-4"></i></Link>
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
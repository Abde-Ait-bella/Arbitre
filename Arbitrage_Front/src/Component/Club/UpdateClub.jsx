import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from 'react-router-dom';

function UpdateStade() {

    const [stades, setStades] = useState();
    const [clubs, setClubs] = useState();
    const [villes, setVilles] = useState();
    const [updateClub, setUpdateClub] = useState();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        axios.get('http://localhost:8000/api/club')
            .then((res) => setClubs(res.data))
        axios.get('http://localhost:8000/api/stade')
            .then((res) => setStades(res.data))
        axios.get('http://localhost:8000/api/ville')
            .then((res) => setVilles(res.data))
    }, [])


    const club = clubs?.find((s) => s.id === parseInt(id));

    console.log(updateClub);

    const handleUpdateClub = (event) => {
        const { name, value } = event.target;
        setUpdateClub(prevValues => ({
            ...prevValues,
            [name]: value.toUpperCase(),
        }))
    }
    const handleUpdateClubSelect = (event) => {
        const { name, value } = event.target;
        setUpdateClub(prevValues => ({
            ...prevValues,
            [name]: parseInt(value),
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            if (updateClub) {
                const responseUpdateClub = axios.put(`http://localhost:8000/api/club/${id}`, updateClub);
                console.log('Server response UpdateClub:', responseUpdateClub);
            }
        } catch (error) {
            console.error('Error:', error);
        }
        navigate('/composants/updatedClub');
    }




    return (
        <>
            <div className="d-flex justify-content-center my-4">
                <div class="col-sm-12 col-xl-6 text-center">
                    <div class="bg-secondary rounded h-100 p-4">
                        <h4 class="mb-4">تعديل النادي</h4>
                        <form onSubmit={handleSubmit}>
                            <div class="row mb-3">
                                <label for="inputEmail3" class="col-sm-2 col-form-label"> الاسم</label>
                                <div class="col-sm-10">
                                    <input name="nom" value={updateClub ? updateClub?.nom : club?.nom  } onChange={handleUpdateClub} type="text" class="form-control" id="inputEmail3" placeholder="الاسم الكامل" />
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="inputEmail3" class="col-sm-2 col-form-label"></label>
                                <div class="col-sm-10">
                                    <input name="abbr" value={updateClub ? updateClub?.abbr : club?.abbr  } onChange={handleUpdateClub} type="text" class="form-control" id="inputEmail3" placeholder="التسمية الملخصة  (ABBR)" />
                                </div>
                            </div>
                            <select name="ville_id" onChange={handleUpdateClubSelect} class="form-select mb-3" aria-label="Default select example">
                                <option selected disabled>المدينة</option>
                                {villes?.map((v) =>
                                    <option selected={club?.ville_id === v.id} key={v.id} value={v.id}>{v.nom}</option>
                                )}
                            </select>
                            <select name="stade_id" onChange={handleUpdateClubSelect} class="form-select mb-3" aria-label="Default select example">
                                <option selected disabled>الملعب</option>
                                {stades?.map((s) =>
                                    <option selected={club?.stade_id === s.id} key={s.id} value={s.id}>{s.nom}</option>
                                )}
                            </select>
                            <div className="d-flex justify-content-between">
                                <Link to="/composants/clubs" class="btn btn-danger pe-3 pt-1 mt-3"> رجوع<i class="fa-solid fa-caret-right me-4"></i></Link>
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
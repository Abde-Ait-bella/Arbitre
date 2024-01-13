import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

function AddStade() {

    const [villes, setVilles] = useState();
    const [addClub, setAddClub] = useState();
    const [stades, setStades] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/api/ville')
            .then((res) => setVilles(res.data))
        axios.get('http://localhost:8000/api/stade')
            .then((res) => setStades(res.data))
    }, [])

    const handleAddClub = (event) => {
        const { name, value } = event.target;
        setAddClub(prevValues => ({
            ...prevValues,
            [name]: value.toUpperCase(),
        }))
    }
    const handleAddClubSelect = (event) => {
        const { name, value } = event.target;
        setAddClub(prevValues => ({
            ...prevValues,
            [name]: parseInt(value),
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            if (addClub) {
                const responseAddClub = axios.post('http://localhost:8000/api/club', addClub);
                console.log('Server response AddStade:', responseAddClub);
                navigate('/composants/addedClub');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    console.log(addClub);

    return (
        <>
            <div className="d-flex justify-content-center my-4">
                <div class="col-sm-12 col-xl-6 text-center">
                    <div class="bg-secondary rounded h-100 p-4">
                        <div className="d-flex justify-content-start">
                            <Link to="/composants/clubs" class="btn btn-danger pe-3 mb-3"> رجوع<i class="fa-solid fa-caret-right me-3"></i></Link>
                        </div>
                        <h6 class="mb-4">إضافة النادي</h6>
                        <form onSubmit={handleSubmit}>
                            <div class="row mb-3">
                                <label for="inputEmail3" class="col-sm-2 col-form-label"> الاسم</label>
                                <div class="col-sm-10">
                                    <input name="nom" onChange={handleAddClub} type="text" class="form-control" id="inputEmail3" placeholder="الاسم الكامل" />
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="inputEmail3" class="col-sm-2 col-form-label"></label>
                                <div class="col-sm-10">
                                    <input name="abbr" onChange={handleAddClub} type="text" class="form-control" id="inputEmail3" placeholder="التسمية الملخصة  (ABBR)" />
                                </div>
                            </div>
                            <select name="ville_id" onChange={handleAddClubSelect} class="form-select mb-3" aria-label="Default select example">
                                <option selected disabled>المدينة</option>
                                {villes?.map((v) =>
                                    <option key={v.id} value={v.id}>{v.nom}</option>
                                )}
                            </select>
                            <select name="stade_id" onChange={handleAddClubSelect} class="form-select mb-3" aria-label="Default select example">
                                <option selected disabled>الملعب</option>
                                {stades?.map((s) =>
                                    <option key={s.id} value={s.id}>{s.nom}</option>
                                )}
                            </select>
                            <div className="mt-5">
                                <button type="submit" class="btn btn-danger pe-5 ps-5">إضافة</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AddStade;
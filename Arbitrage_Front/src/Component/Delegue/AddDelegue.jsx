import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

function AddArbitre() {

    const [villes, setVilles] = useState();
    const [addDelegue, setAddDelegue] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/api/ville')
            .then((res) => setVilles(res.data))
    }, [])

    const handleAddDelegue = (event) => {
        const { name, value } = event.target;
        setAddDelegue(prevValues => ({
            ...prevValues,
            [name]: value,
        }))
    }
    const handleAddDelegueSelect = (event) => {
        const { name, value } = event.target;
        setAddDelegue(prevValues => ({
            ...prevValues,
            [name]: parseInt(value),
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            if (addDelegue) {
                const responseAddDelegue = axios.post('http://localhost:8000/api/delegue', addDelegue);
                console.log('Server response AddDelegue:', responseAddDelegue);
                navigate('/composants/addedDelegue');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    console.log(addDelegue)


    return (
        <>
            <div className="d-flex justify-content-center my-4">
                <div class="col-sm-12 col-xl-6 text-center">
                    <div class="bg-secondary rounded h-100 p-4" >
                        <div className="d-flex justify-content-start">
                            <Link to="/composants/delegue" class="btn btn-danger pe-3 mb-3"> رجوع<i class="fa-solid fa-caret-right me-3"></i></Link>
                        </div>
                        <h4 class="mb-4">إضافة المندوب</h4>

                        <form onSubmit={handleSubmit}>
                            <div class="row mb-3">
                                <label for="inputEmail3" class="col-sm-2 col-form-label"> الاسم</label>
                                <div class="col-sm-10">
                                    <input name="prenom" onChange={handleAddDelegue} type="text" class="form-control" id="inputEmail3" />
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="inputEmail3" class="col-sm-2 col-form-label"> النسب</label>
                                <div class="col-sm-10">
                                    <input name="nom" onChange={handleAddDelegue} type="text" class="form-control" id="inputEmail3" />
                                </div>
                            </div>
                            <select name="ville_id" onChange={handleAddDelegueSelect} class="form-select mb-3" aria-label="Default select example">
                                <option selected disabled>المدينة</option>
                                {villes?.map((v) =>
                                    <option key={v.id} value={v.id}>{v.nom}</option>
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
export default AddArbitre;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

function AddStade() {

    const [villes, setVilles] = useState();
    const [addStade, setAddStade] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/api/ville')
            .then((res) => setVilles(res.data))
    }, [])

    const handleAddStade = (event) => {
        const { name, value } = event.target;
        setAddStade(prevValues => ({
            ...prevValues,
            [name]: value,
        }))
    }
    const handleAddStadeSelect = (event) => {
        const { name, value } = event.target;
        setAddStade(prevValues => ({
            ...prevValues,
            [name]: parseInt(value),
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            if (addStade) {
                const responseAddStade = axios.post('http://localhost:8000/api/stade', addStade);
                console.log('Server response AddStade:', responseAddStade);
                
                navigate('/composants/addedStade');
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
                        <div className="d-flex justify-content-start">
                            <Link to="/composants/stades" class="btn btn-warning pe-3 mb-3"> رجوع<i class="fa-solid fa-caret-right me-3"></i></Link>
                        </div>
                        <h4 class="mb-4">إضافة الملعب</h4>
                        <form onSubmit={handleSubmit}>
                            <div class="row mb-3">
                                <label for="inputEmail3" class="col-sm-2 col-form-label"> الاسم</label>
                                <div class="col-sm-10">
                                    <input name="nom" onChange={handleAddStade} type="text" class="form-control" id="inputEmail3" />
                                </div>
                            </div>
                            <select name="ville_id" onChange={handleAddStadeSelect} class="form-select mb-3" aria-label="Default select example">
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
export default AddStade;
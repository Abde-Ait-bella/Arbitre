import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

function AddVille() {

    const [addVille, setAddVille] = useState();
    const navigate = useNavigate();

    const handleAddVille = (event) => {
        const { name, value } = event.target;
        setAddVille(prevValues => ({
            ...prevValues,
            [name]: value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            if (addVille) {
                const responseAddVille = axios.post('http://localhost:8000/api/ville', addVille);
                console.log('Server response AddVille:', responseAddVille);
                navigate('/composants/addedVille');
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
                            <Link to="/composants/villes" class="btn btn-warning pe-3 mb-3"> رجوع<i class="fa-solid fa-caret-right me-3"></i></Link>
                        </div>
                        <h6 class="mb-4">إضافة مدينة - جماعة</h6>
                        <form onSubmit={handleSubmit}>
                            <div class="row mb-3">
                                <div class="col-sm-12">
                                    <input placeholder="المدينة -الجماعة" name="nom" onChange={handleAddVille} type="text" class="form-control" id="inputEmail3" />
                                </div>
                            </div>
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
export default AddVille;
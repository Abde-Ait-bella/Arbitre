import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

function AddArbitre() {

    const [addJoueur, setAddJoueur] = useState();
    const navigate = useNavigate();

    const handleAddJoueur = (event) => {
        const { name, value } = event.target;
        setAddJoueur(prevValues => ({
            ...prevValues,
            [name]: value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            if (addJoueur) {
                const responseAddJoueur = axios.post('http://localhost:8000/api/joueur', addJoueur);
                console.log('Server response AddJoueur:', responseAddJoueur);
                
                navigate('/composants/addedJoueur');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    console.log(addJoueur)

    return (
        <>
            <div className="d-flex justify-content-center my-4">
                <div class="col-sm-12 col-xl-6 text-center">
                    <div class="bg-secondary rounded h-100 p-4">
                        <div className="d-flex justify-content-start">
                            <Link to="/composants/joueur" class="btn btn-danger pe-3 mb-3"> رجوع<i class="fa-solid fa-caret-right me-3"></i></Link>
                        </div>
                        <h4 class="mb-4">إضافة لاعب</h4>
                        <form onSubmit={handleSubmit}>
                            <div class="row mb-3">
                                <label for="inputEmail3" class="col-sm-2 col-form-label"> الاسم</label>
                                <div class="col-sm-10">
                                    <input name="nom" onChange={handleAddJoueur} type="text" class="form-control" id="inputEmail3" />
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="inputEmail3" class="col-sm-3 col-form-label"> رقم الرخصة</label>
                                <div class="col-sm-9">
                                    <input name="joueur_numero_licence" onChange={handleAddJoueur} type="text" class="form-control" id="inputEmail3" />
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="inputEmail3" class="col-sm-3 col-form-label"> رقم اللاعب</label>
                                <div class="col-sm-9">
                                    <input name="joueur_numero" onChange={handleAddJoueur} type="text" class="form-control" id="inputEmail3" />
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
export default AddArbitre;
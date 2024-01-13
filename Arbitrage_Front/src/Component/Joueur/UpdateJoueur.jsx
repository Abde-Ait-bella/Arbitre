import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from 'react-router-dom';

function UpdateStade() {

    const [joueurs, setJoueur] = useState();
    const [updateJoueur, setUpdateJoueur] = useState();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        axios.get('http://localhost:8000/api/joueur')
            .then((res) => setJoueur(res.data))
    }, [])


    const joueur = joueurs?.find((a) => a.id === parseInt(id));

    console.log(updateJoueur);

    const handleUpdateJoueur = (event) => {
        const { name, value } = event.target;
        setUpdateJoueur(prevValues => ({
            ...prevValues,
            [name]: value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            if (updateJoueur) {
                const responseUpdateJoueur = axios.put(`http://localhost:8000/api/joueur/${id}`, updateJoueur);
                console.log('Server response AddJoueur:', responseUpdateJoueur);
            }
        } catch (error) {
            console.error('Error:', error);
        }
        navigate('/composants/updatedJoueur');
    }




    return (
        <>
            <div className="d-flex justify-content-center my-4">
                <div class="col-sm-12 col-xl-6 text-center">
                    <div class="bg-secondary rounded h-100 p-4">
                        <h4 class="mb-4">تعديل اللاعب</h4>
                        <form onSubmit={handleSubmit}>
                            <div class="row mb-3">
                                <label for="inputEmail3" class="col-sm-2 col-form-label"> الاسم</label>
                                <div class="col-sm-10">
                                    <input name="nom" value={updateJoueur ? updateJoueur?.nom?.toUpperCase() : joueur?.nom?.toUpperCase()} onChange={handleUpdateJoueur} type="text" class="form-control" id="inputEmail3" />
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="inputEmail3" class="col-sm-3 col-form-label"> رقم الرخصة</label>
                                <div class="col-sm-9">
                                    <input name="joueur_numero_licence" value={updateJoueur ? updateJoueur?.joueur_numero_licence?.toUpperCase() : joueur?.joueur_numero_licence?.toUpperCase()} onChange={handleUpdateJoueur} type="text" class="form-control" id="inputEmail3" />
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="inputEmail3" class="col-sm-3 col-form-label"> رقم اللاعب</label>
                                <div class="col-sm-9">
                                    <input name="joueur_numero" value={updateJoueur ? updateJoueur?.joueur_numero : joueur?.joueur_numero} onChange={handleUpdateJoueur} type="text" class="form-control" id="inputEmail3" />
                                </div>
                            </div>
                            <div className="d-flex justify-content-between">
                                <Link to="/composants/Delegue" class="btn btn-danger pe-3 pt-1 mt-3"> رجوع<i class="fa-solid fa-caret-right me-4"></i></Link>
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
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from 'react-router-dom';

function UpdateStade() {

    const [stades, setStades] = useState();
    const [villes, setVilles] = useState();
    const [updateStade, setUpdateStade] = useState();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        axios.get('http://localhost:8000/api/stade')
            .then((res) => setStades(res.data))
        axios.get('http://localhost:8000/api/ville')
            .then((res) => setVilles(res.data))
    }, [])


    const stade = stades?.find((s) => s.id === parseInt(id));

    console.log(updateStade);

    const handleUpdateStade = (event) => {
        const { name, value } = event.target;
        setUpdateStade(prevValues => ({
            ...prevValues,
            [name]: value,
        }))
    }
    const handleUpdateStadeSelect = (event) => {
        const { name, value } = event.target;
        setUpdateStade(prevValues => ({
            ...prevValues,
            [name]: parseInt(value),
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            if (updateStade) {
                const responseUpdateStade = axios.put(`http://localhost:8000/api/stade/${id}`, updateStade);
                console.log('Server response AddStade:', responseUpdateStade);
            }
        } catch (error) {
            console.error('Error:', error);
        }
        navigate('/composants/updatedStade');
    }




    return (
        <>
            <div className="d-flex justify-content-center my-4">
                <div class="col-sm-12 col-xl-6 text-center">
                    <div class="bg-secondary rounded h-100 p-4">
                        <h4 class="mb-4">تعديل الملعب</h4>
                        <form onSubmit={handleSubmit}>
                            <div class="row mb-3">
                                <label for="inputEmail3" class="col-sm-2 col-form-label"> الاسم</label>
                                <div class="col-sm-10">
                                    <input name="nom" value={updateStade ? updateStade?.nom : stade?.nom  } onChange={handleUpdateStade} type="text" class="form-control" id="inputEmail3" />
                                </div>
                            </div>
                            <select name="ville_id" onChange={handleUpdateStadeSelect} class="form-select mb-3" aria-label="Default select example">
                                <option selected disabled>المدينة</option>
                                {villes?.map((v) =>
                                    <option selected={stade.ville_id === v.id} key={v.id} value={(v.id)}>{v.nom}</option>
                                )}
                            </select>
                            <div className="d-flex justify-content-between">
                                <Link to="/composants/stade" class="btn btn-danger pe-3 pt-1 mt-3"> رجوع<i class="fa-solid fa-caret-right me-4"></i></Link>
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
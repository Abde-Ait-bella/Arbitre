import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link  } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function AddArbitre() {

    const [villes, setVilles] = useState();
    const [addArbitre, setAddArbitre] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/api/ville')
            .then((res) => setVilles(res.data))
    }, [])

    const handleAddArbitre = (event) => {
        const { name, value } = event.target;
        setAddArbitre(prevValues => ({
            ...prevValues,
            [name]: value,
        }))
    }
    const handleAddStadeSelect = (event) => {
        const { name, value } = event.target;
        setAddArbitre(prevValues => ({
            ...prevValues,
            [name]: parseInt(value),
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            if (addArbitre) {
                const responseAddArbitre = axios.post('http://localhost:8000/api/arbitre', addArbitre);
                console.log('Server response AddArbitre:', responseAddArbitre);
                navigate('/composants/addedArbitre');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    console.log(addArbitre)


    return (
        <>
            <div className="d-flex justify-content-center my-4">
                <div class="col-sm-12 col-xl-6 text-center">
                    <div class="bg-secondary rounded h-100 p-4">
                        <div className="d-flex justify-content-start">
                            <Link to="/composants/arbitres" class="btn btn-danger pe-3 mb-3"> رجوع<i class="fa-solid fa-caret-right me-3"></i></Link>
                        </div>
                        <h4 class="mb-4">إضافة الحكم</h4>
                        <form onSubmit={handleSubmit}>
                            <div class="row mb-3">
                                <label for="inputEmail3" class="col-sm-2 col-form-label"> الاسم</label>
                                <div class="col-sm-10">
                                    <input name="prenom" onChange={handleAddArbitre} type="text" class="form-control" id="inputEmail3" />
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="inputEmail3" class="col-sm-2 col-form-label"> النسب</label>
                                <div class="col-sm-10">
                                    <input name="nom" onChange={handleAddArbitre} type="text" class="form-control" id="inputEmail3" />
                                </div>
                            </div>
                            <select name="ville_id" onChange={handleAddStadeSelect} class="form-select mb-3" aria-label="Default select example">
                                <option selected disabled>المدينة</option>
                                {villes?.map((v) =>
                                    <option key={v.id} value={v.id}>{v.nom}</option>
                                )}
                            </select>
                                <fieldset class="row mb-3">
                                    <legend class="col-form-label col-sm-2 pt-1 mb-2">التخصص</legend>
                                    <div class="col-md-5 col-sm-10 mt-lg-5 mb-2">
                                        <div class="form-check">
                                            <input class="form-check-input" onChange={handleAddArbitre} type="radio" name="type" id="gridRadios1" value="center" />
                                            <label class="form-check-label" for="gridRadios1">
                                                حكم الساحة
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" onChange={handleAddArbitre} type="radio" name="type" id="gridRadios2" value="Assistant" />
                                            <label class="form-check-label" for="gridRadios2">
                                                الحكم المساعد
                                            </label>
                                        </div>
                                    </div>
                                </fieldset>
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
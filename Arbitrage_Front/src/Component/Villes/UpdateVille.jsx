import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from 'react-router-dom';

function UpdateVille() {

    
    const [villes, setVilles] = useState();
    const [updateVille, setUpdateVille] = useState();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        axios.get('http://localhost:8000/api/ville')
            .then((res) => setVilles(res.data))
    }, [])


    const ville = villes?.find((v) => v.id === parseInt(id));


    const handleUpdateVille = (event) => {
        const { name, value } = event.target;
        setUpdateVille(prevValues => ({
            ...prevValues,
            [name]: value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            if (updateVille) {
                const responseUpdateVille = axios.put(`http://localhost:8000/api/ville/${id}`, updateVille);
                console.log('Server response AddVille:', responseUpdateVille);
            }
        } catch (error) {
            console.error('Error:', error);
        }
        navigate('/composants/updatedVille');
    }
    console.log(id)



    return (
        <>
            <div className="d-flex justify-content-center my-4">
                <div class="col-sm-12 col-xl-6 text-center">
                    <div class="bg-secondary rounded h-100 p-4">
                        <h6 class="mb-4">تعديل المدينة</h6>
                        <form onSubmit={handleSubmit}>
                            <div class="row mb-3">
                                <div class="col-sm-12">
                                    <input placeholder="المدينة - الجماعة" name="nom" value={updateVille ? updateVille?.nom : ville?.nom  } onChange={handleUpdateVille} type="text" class="form-control" id="inputEmail3" />
                                </div>
                            </div>
                            <div className="d-flex justify-content-between">
                                <Link to="/composants/villes" class="btn btn-danger pe-3 pt-1 mt-3"> رجوع<i class="fa-solid fa-caret-right me-4"></i></Link>
                                <button type="submit" class="btn btn-danger mt-3">تعديل <i class="fa-solid fa-circle-check me-3"></i></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default UpdateVille;
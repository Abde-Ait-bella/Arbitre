import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

function DelegueListe() {

    const [delegue, setDelegue] = useState();
    const [villes, setVilles] = useState();

    useEffect(() => {
        axios.get('http://localhost:8000/api/delegue')
            .then((res) => setDelegue(res.data))
        axios.get('http://localhost:8000/api/ville')
            .then((res) => setVilles(res.data))
    }, [])


    const handleDelete = (id) => {
        // Make an API call to delete the record with the specified id
        axios.delete(`http://localhost:8000/api/delegue/${id}`)
            .then((response) => {
                // Handle success, e.g., update your state or perform any necessary actions
                console.log(`delegue with id ${id} deleted successfully`);
            })
            .catch((error) => {
                // Handle error, e.g., show an error message
                console.error(`Error deleting delegue with id ${id}:`, error);
            });
    };

    return (
        <>
            {/* <!-- Table matches --> */}

            <div class="container-fluid pt-4 px-4">
                <div class="bg-secondary text-center rounded p-4">
                    <div class="d-flex align-items-center justify-content-start mb-4">
                        {/* <h6 class="mb-0">Recent Salse</h6> */}
                        {/* <a href="">Show All</a> */}
                        <Link to="/composants/addDelegue" class="btn btn-warning pe-3">إضافة مندوب <i class="fa-solid fa-circle-plus me-2"></i></Link>

                    </div>
                    <div class="table-responsive">
                        {/* {matches.map((m) => ( */}
                        <table class="table text-start align-middle table-hover mb-0">
                            <thead>
                                <tr class="text-white">
                                    <th scope="col" className="text-center">الاسم</th>
                                    <th scope="col" className="text-center">النسب</th>
                                    <th scope="col" className="text-center">المدينة</th>
                                </tr>
                            </thead>
                            <tbody>
                                {delegue?.map((d) => (
                                    <tr className="text-center" key={d.id}>
                                        <td>{d.prenom.toUpperCase()}</td>
                                        <td>{d.nom.toUpperCase()}</td>
                                        <td>{villes?.find(ville => ville.id === d.ville_id)?.nom}</td>
                                        <td className='border-0'><Link to='/composants/deletedDelegue' onClick={() => handleDelete(d.id)} ><i class="fa-solid fa-trash"></i></Link> <Link to={`/composants/updateDelegue/${d.id}`}><i class="fa-solid fa-wrench me-3"></i></Link></td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* <!-- End table matches --> */}
        </>
    )
}

export default DelegueListe;
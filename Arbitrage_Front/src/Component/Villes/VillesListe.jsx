import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import '../../style/Stade/StadesListe.scss'

function VillesListe() {

    const [villes, setVilles] = useState();

    useEffect(() => {
        axios.get('http://localhost:8000/api/ville')
            .then((res) => setVilles(res.data))
    }, [])

    const handleDelete = (id) => {
        console.log(id)
        // Make an API call to delete the record with the specified id
        axios.delete(`http://localhost:8000/api/ville/${id}`)
            .then((response) => {
                // Handle success, e.g., update your state or perform any necessary actions
                console.log(`Ville with id ${id} deleted successfully`);
            })
            .catch((error) => {
                // Handle error, e.g., show an error message
                console.error(`Error deleting ville with id ${id}:`, error);
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
                        <Link to="/composants/addVille" class="btn btn-warning pe-3">إضافة مدينة - جماعة <i class="fa-solid fa-circle-plus me-2"></i></Link>

                    </div>
                    <div class="table-responsive">
                        {/* {matches.map((m) => ( */}
                        <table class="table text-start align-middle table-hover mb-0">
                            <thead>
                                <tr class="text-white">
                                    <th scope="col" className="text-center">المدينة أو الجماعة</th>
                                    <th scope="col" className="text-center">الحدف أو التعديل</th>
                                </tr>
                            </thead>
                            <tbody>
                                {villes?.map((v) => (
                                    <tr className="text-center" key={v.id}>
                                        <td>{v.nom}</td>
                                        <td><Link to='/composants/deletedVille' onClick={() => handleDelete(v.id)} ><i class="fa-solid fa-trash"></i></Link> <Link to={`/composants/updateVille/${v.id}`}><i class="fa-solid fa-wrench me-3"></i></Link></td>
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

export default VillesListe;
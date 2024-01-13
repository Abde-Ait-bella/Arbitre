import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import '../../style/Stade/StadesListe.scss'

function StadesListe() {

    const [stades, setStades] = useState();
    const [villes, setVilles] = useState();

    useEffect(() => {
        axios.get('http://localhost:8000/api/stade')
            .then((res) => setStades(res.data))
        axios.get('http://localhost:8000/api/ville')
            .then((res) => setVilles(res.data))
    }, [])

    // const handleDelete = (id) => {
    //     console.log(id)

    //     axios.delete(`http://localhost:8000/api/stade/${id}`);
    // }

    const handleDelete = (id) => {
        console.log(id)
        // Make an API call to delete the record with the specified id
        axios.delete(`http://localhost:8000/api/stade/${id}`)
            .then((response) => {
                // Handle success, e.g., update your state or perform any necessary actions
                console.log(`Stade with id ${id} deleted successfully`);
            })
            .catch((error) => {
                // Handle error, e.g., show an error message
                console.error(`Error deleting stade with id ${id}:`, error);
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
                        <Link to="/composants/addStade" class="btn btn-warning pe-3">إضافة ملعب <i class="fa-solid fa-circle-plus me-2"></i></Link>

                    </div>
                    <div class="table-responsive">
                        {/* {matches.map((m) => ( */}
                        <table class="table text-start align-middle table-hover mb-0">
                            <thead>
                                <tr class="text-white">
                                    <th scope="col" className="text-center">الملعب</th>
                                    <th scope="col" className="text-center">المدينة أو الجماعة</th>
                                    <th scope="col" className="text-center">الحدف أو التعديل</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stades?.map((s) => (
                                    <tr className="text-center" key={s.id}>
                                        <td>{s.nom}</td>
                                        <td>{villes?.find(ville => ville.id === s.ville_id)?.nom}</td>
                                        <td><Link to='/composants/DeletedStade' onClick={() => handleDelete(s.id)} ><i class="fa-solid fa-trash"></i></Link> <Link to={`/composants/updateStade/${s.id}`}><i class="fa-solid fa-wrench me-3"></i></Link></td>
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

export default StadesListe;
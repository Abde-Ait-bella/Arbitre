import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

function JoueurListe() {

    const [joueur, setJoueur] = useState();

    useEffect(() => {
        axios.get('http://localhost:8000/api/joueur')
            .then((res) => setJoueur(res.data))
    }, [])


    const handleDelete = (id) => {
        // Make an API call to delete the record with the specified id
        axios.delete(`http://localhost:8000/api/joueur/${id}`)
            .then((response) => {
                // Handle success, e.g., update your state or perform any necessary actions
                console.log(`Joueur with id ${id} deleted successfully`);
            })
            .catch((error) => {
                // Handle error, e.g., show an error message
                console.error(`Error deleting Joueur with id ${id}:`, error);
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
                        <Link to="/composants/addJoueur" class="btn btn-warning pe-3">إضافة لاعب <i class="fa-solid fa-circle-plus me-2"></i></Link>

                    </div>
                    <div class="table-responsive">
                        {/* {matches.map((m) => ( */}
                        <table class="table text-start align-middle table-hover mb-0">
                            <thead>
                                <tr class="text-white">
                                    <th scope="col" className="text-center">الاسم</th>
                                    <th scope="col" className="text-center">رقم الرخصة</th>
                                    <th scope="col" className="text-center">رقم الاعب</th>
                                </tr>
                            </thead>
                            <tbody>
                                {joueur?.map((j) => (
                                    <tr className="text-center" key={j.id}>
                                        <td>{j.nom.toUpperCase()}</td>
                                        <td>{j.joueur_numero_licence.toUpperCase()}</td>
                                        <td>{j.joueur_numero}</td>
                                        <td className='border-0'><Link to='/composants/deletedJoueur' onClick={() => handleDelete(j.id)} ><i class="fa-solid fa-trash"></i></Link> <Link to={`/composants/updateJoueur/${j.id}`}><i class="fa-solid fa-wrench me-3"></i></Link></td>
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

export default JoueurListe;
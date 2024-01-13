import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import '../../style/Stade/StadesListe.scss'

function ArbiTreListe() {

    const [arbitre, setArbitre] = useState();
    const [villes, setVilles] = useState();

    useEffect(() => {
        axios.get('http://localhost:8000/api/arbitre')
            .then((res) => setArbitre(res.data))
        axios.get('http://localhost:8000/api/ville')
            .then((res) => setVilles(res.data))
    }, [])


    const handleDelete = (id) => {
        console.log(id)
        // Make an API call to delete the record with the specified id
        axios.delete(`http://localhost:8000/api/arbitre/${id}`)
            .then((response) => {
                // Handle success, e.g., update your state or perform any necessary actions
                console.log(`Arbitre with id ${id} deleted successfully`);
            })
            .catch((error) => {
                // Handle error, e.g., show an error message
                console.error(`Error deleting arbitre with id ${id}:`, error);
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
                        <Link to="/composants/addArbitre" class="btn btn-warning pe-3">إضافة حكم <i class="fa-solid fa-circle-plus me-2"></i></Link>

                    </div>
                    <div class="table-responsive">
                        {/* {matches.map((m) => ( */}
                        <table class="table text-start align-middle table-hover mb-0">
                            <thead>
                                <tr class="text-white">
                                    <th scope="col" className="text-center">الاسم</th>
                                    <th scope="col" className="text-center">النسب</th>
                                    <th scope="col" className="text-center">التخصص</th>
                                    <th scope="col" className="text-center">المدينة</th>
                                </tr>
                            </thead>
                            <tbody>
                                {arbitre?.map((a) => (
                                    <tr className="text-center" key={a.id}>
                                        <td>{a.prenom.toUpperCase()}</td>
                                        <td>{a.nom.toUpperCase()}</td>
                                        <td>{a.type.toUpperCase()}</td>
                                        <td>{villes?.find(ville => ville.id === a.ville_id)?.nom}</td>
                                        <td className='border-0'><Link to='/composants/deletedArbitre' onClick={() => handleDelete(a.id)} ><i class="fa-solid fa-trash"></i></Link> <Link to={`/composants/updateArbitre/${a.id}`}><i class="fa-solid fa-wrench me-3"></i></Link></td>
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

export default ArbiTreListe;
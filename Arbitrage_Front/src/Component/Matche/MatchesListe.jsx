import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Matches() {

    const [matches, setMatches] = useState();
    const [club, setClub] = useState();
    const [villes, setVilles] = useState();
    const [competition, setCompetition] = useState();
    const [categories, setCategories] = useState();

        useEffect(() => {
            axios.get('http://localhost:8000/api/matche')
                .then((res) => { setMatches(res.data) })
        axios.get('http://localhost:8000/api/club')
            .then((res) => { setClub(res.data) })
        axios.get('http://localhost:8000/api/ville')
            .then((res) => setVilles(res.data))
        axios.get('http://localhost:8000/api/competition')
            .then((res) => setCompetition(res.data))
        axios.get('http://localhost:8000/api/category')
            .then((res) => setCategories(res.data))
    }, [])

    const handleDelete = (id) => {
        console.log(id)
        // Make an API call to delete the record with the specified id
        axios.delete(`http://localhost:8000/api/matche/${id}`)
            .then((response) => {
                // Handle success, e.g., update your state or perform any necessary actions
                console.log(`Matche with id ${id} deleted successfully`);
            })
            .catch((error) => {
                // Handle error, e.g., show an error message
                console.error(`Error deleting Matche with id ${id}:`, error);
            });
    };


    console.log(club)

    return (
        <>
            {/* <!-- Table matches --> */}

            <div class="container-fluid pt-4 px-4">
                <div class="bg-secondary text-center rounded p-4">
                    <div class="d-flex align-items-center justify-content-between mb-3">
                        {/* <h6 class="mb-0">Recent Salse</h6> */}
                        {/* <a href="">Show All</a> */}
                        <Link to="/addMatche" class="btn btn-warning pe-3">إضافة مباراة <i class="fa-solid fa-circle-plus me-2"></i></Link>
                    </div>
                    <div class="table-responsive">
                        {/* {matches.map((m) => ( */}
                        <table class="table text-start align-middle table-hover mb-0">
                            <thead>
                                <tr class="text-white">
                                    <th scope="col" className="text-center">التاريخ</th>
                                    <th scope="col" className="text-center">الفريق المستقبل</th>
                                    <th scope="col" className="text-center">الفريق الزائر</th>
                                    <th scope="col" className="text-center">المنافسة</th>
                                    <th scope="col" className="text-center">الفئة</th>
                                    <th scope="col" className="text-center">النتيجة</th>
                                    <th scope="col" className="text-center">المدينة</th>
                                    {/* <th scope="col" className="text-center">Action</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {matches?.map((m) => (
                                    <tr className="text-center" key={m.id}>
                                        <td>{m.date}</td>
                                        <td>{club?.find(club => club.id === m.club_id_1)?.nom} ({club?.find(club => club.id === m.club_id_1)?.abbr})</td>
                                        <td>{club?.find(club => club.id === m.club_id_2)?.nom} ({club?.find(club => club.id === m.club_id_1)?.abbr})</td>
                                        <td>{competition?.find(c => c.id === m.competition_id)?.nom}</td>
                                        <td>{categories?.find(c => c.id === m.categorie_id)?.nom}</td>
                                        <td>{m.result_club_1}-{m.result_club_2}</td>
                                        <td>{villes?.find(ville => ville.id === m.ville_id)?.nom}</td>
                                        <td><Link to='/matches' onClick={() => handleDelete(m.id)} ><i class="fa-solid fa-trash"></i></Link> <Link to={`/updateMatche/${m.id}`}><i class="fa-solid fa-wrench me-3"></i></Link></td>
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
export default Matches;
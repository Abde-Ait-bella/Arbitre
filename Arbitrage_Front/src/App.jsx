import React, { useEffect, useState } from 'react';
import { Route, Link, NavLink, Outlet, Routes, useNavigate } from "react-router-dom";

import Matches from './Component/Matche/MatchesListe';
import UpdateMatche from './Component/Matche/UpdateMatche/UpdateMatche';
import DeletedMatche from './Component/Matche/DeletedMatche';
import UpdatedMatche from './Component/Matche/UpdateMatche/UpdatedMatche';

import Stades from './Component/Stade/StadesListe';
import AddStade from './Component/Stade/AddStade';
import AddedStade from './Component/Stade/AddedStade';
import DeletedStade from './Component/Stade/DeletedStade';
import UpdateStade from './Component/Stade/UpdateStade';
import UpdatedStade from './Component/Stade/UpdatedStade';
import ClubListe from './Component/Club/ClubsListe';
import AddClub from './Component/Club/AddClub';
import AddedClub from './Component/Club/AddedClub';
import DeletedClub from './Component/Club/DeletedClub';
import UpdateClub from './Component/Club/UpdateClub';
import UpdatedClub from './Component/Club/UpdatedClub';
// import "bootstrap/dist/css/bootstrap.min.css";
import RapportListe from './Component/Rapport/RapportListe';
import DetailleRapport from './Component/Rapport/DetailleRapport';
import AddRapport from './Component/Rapport/AddRapport/AddRapport';
import AddedRapport from './Component/Rapport/AddRapport/AddedRapport';

import Home from './Component/Home';
import './css/style.css'
import './css/bootstrap.min.css'
import $ from 'jquery';
import ArbiTreListe from './Component/Arbitre/ArbitreListe';
import AddArbitre from './Component/Arbitre/AddArbitre';
import AddedArbitre from './Component/Arbitre/AddedArbitre';
import UpdateArbitre from './Component/Arbitre/UpdateArbitre';
import UpdatedArbitre from './Component/Arbitre/UpdatedArbitre';
import DeletedArbitre from './Component/Arbitre/DeletedArbitre';

import DelegueListe from './Component/Delegue/DelegueListe';
import AddDelegue from './Component/Delegue/AddDelegue';
import AddedDelegue from './Component/Delegue/AddedDelegue';
import UpdateDelegue from './Component/Delegue/UpdateDelegue';
import UpdatedDelegue from './Component/Delegue/UpdatedDelegue';
import DeletedDelegue from './Component/Delegue/DeletedDelegue';

import JoueurListe from './Component/Joueur/JoueurListe';
import AddJoueur from './Component/Joueur/AddJoueur';
import AddedJoueur from './Component/Joueur/AddedJoueur';
import UpdateJoueur from './Component/Joueur/UpdateJoueur';
import UpdatedJoueur from './Component/Joueur/UpdatedJoueur';
import DeletedJoueur from './Component/Joueur/DeletedJoueur';

import VillesListe from './Component/Villes/VillesListe';
import AddVille from './Component/Villes/AddVille';
import AddedVille from './Component/Villes/AddedVille';
import UpdateVille from './Component/Villes/UpdateVille';
import UpdatedVille from './Component/Villes/UpdatedVille';
import DeletedVille from './Component/Villes/DeletedVille';
import { axiosClinet } from './Api/axios';


function App() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState();
  const [authenticated, _setAuthenticated] = useState('true' === window.localStorage.getItem('AUTHENTICATED'))


  useEffect(() => {

    axiosClinet.get('/api/user').then(
      (Response) => {setUser(Response.data)
    })

    const spinner = () => {
      setTimeout(() => {
        const $spinner = $('#spinner');
        if ($spinner.length > 0) {
          $spinner.removeClass('show');
        }
      }, 10);
    }
    spinner();  // Call the spinner function when the component mounts


    return () => clearTimeout(spinner);
  }, []);

  const navigate = useNavigate(); 

  const logout = async () =>{
    await axiosClinet.post('/api/logout').then(() =>{
      window.localStorage.setItem('ACCESS_TOKEN', '')
      // setAuthenticated(false)
      navigate('/login')
    })
  }

  // const setAuthenticated = (isAuthenticated) => {
  //   // _setAuthenticated(isAuthenticated)
  //   window.localStorage.setItem('AUTHENTICATED', isAuthenticated)
  // }

  const handleSidebarToggle = () => {
    setIsSidebarOpen(prevState => !prevState);
  };



  return (

    <>
      <div class="container-fluid position-relative d-flex p-0" >
        {/* <!-- Spinner Start --> */}
        <div id="spinner" class="show bg-dark position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
          <div class="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
        {/* <!-- Spinner End --> */}


        {/* <!-- Sidebar Start --> */}
        <div className={`sidebar ps-4 pb-3 ${isSidebarOpen ? 'open' : ''}`}>
          <nav className="navbar bg-secondary navbar-dark" >
            <Link to='/' className="navbar-brand mx-4 mb-3 mt-2">
              <h3 className="logo">
                <i class="fa-solid fa-flag-checkered ms-2 me-3"></i>
                {/* <img style={{ width: php'40px', height: '40px', marginLeft: '10px'}} src="./img/user.svg" alt="" /> */}
                ArbiTre</h3>
            </Link>
            <div class="d-flex align-items-center me-5 mb-4">
              <div class="position-relative">
                <img class="rounded-circle" src="img/user.png" alt="" style={{ width: '40px', height: '40px' }} />
                <div class="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
              </div>
              <div class="me-3 mt-2">
                <h6 class="mb-0 text-center">{user?.name}</h6>
                <span>الحكم</span>
              </div>
            </div>
            <div class="navbar-nav w-100">
              <div className='mb-2'>
                <NavLink to='/' className={({ isActive }) =>
                  isActive ? "nav-item nav-link Active" : "nav-item nav-link"
                }><i class="fa-solid fa-house ms-3"></i>الصفحة الرئيسية</NavLink>
                {/* <i class="fa fa-tachometer-alt me-2"></i> */}
              </div>
              <div className="me-2">
                <NavLink to='/matches' className={({ isActive }) =>
                  isActive ? "nav-item nav-link Active" : "nav-item nav-link"
                }><i class="fa-solid fa-futbol ms-3 me-2"></i>المباريات</NavLink>
              </div>
              <div class="nav-item dropdown mt-1 me-2">
                <NavLink to={'/composants'} className={({ isActive }) => isActive ? "nav-link dropdown-toggle active show Active" : "nav-link dropdown-toggle"}
                  data-bs-toggle="dropdown" ><i class="fa-solid fa-screwdriver-wrench me-2 ms-3"></i>المكونات</NavLink>
                <div class="dropdown-menu bg-transparent border-0"
                >
                  <Link to="/composants/stades" className="dropdown-item" >الملاعب<i class="fa-solid fa-ring me-3 mt-1"></i></Link>
                  <Link to="/composants/clubs" className="dropdown-item">الأندية<i class="fa-solid fa-shield me-4 mt-1"></i></Link>
                  <Link to="/composants/arbitres" className="dropdown-item">الحكام <i class="fa-solid fa-clone me-4 mt-1"></i></Link>
                  <Link to='/composants/delegue' className="dropdown-item">المناديب <i class="fa-solid fa-user-tie me-2 mt-1"></i></Link>
                  <Link to='/composants/joueur' className="dropdown-item">الاعبون <i class="fa-solid fa-person-running me-3 mt-1"></i></Link>
                  <Link to='/composants/villes' className="dropdown-item">المدن <i class="fa-solid fa-city me-4 mt-1"></i></Link>
                </div>
              </div>
              <div className='mt-1 me-2'>
                <NavLink to='/rapport' className={({ isActive }) =>
                  isActive ? "nav-item nav-link Active" : "nav-item nav-link"
                }><i class="fa-solid fa-book ms-3 me-2"></i> التقارير</NavLink>
              </div>
            </div>
          </nav>
        </div>
        <Outlet />
        {/* <!-- Sidebar End --> */}

        {/* <!-- Content Start --> */}

        <div className={`content bg-dark ${isSidebarOpen ? 'open' : ''}`}>
          {/* <!-- Navbar Start --> */}
          <nav class="navbar navbar-expand bg-secondary navbar-dark sticky-top px-4 py-0">
            <a href="index.html" class="navbar-brand d-flex d-lg-none me-4">
              <h2 class="text-primary mb-0"><i class="fa fa-user-edit"></i></h2>
            </a>
            <a href="#" class="sidebar-toggler flex-shrink-0 me-4" onClick={handleSidebarToggle}>
              <i class="fa fa-bars"></i>
            </a>
            <form class="d-none d-md-flex me-5">
              <input class="form-control bg-dark border-0" type="search" placeholder="بحت" />
            </form>
            <div class="navbar-nav align-items-center me-auto">
              <div class="nav-item dropdown ms-4">
                <Link href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                  <img class="rounded-circle me-lg-2 ms-2" src="img/user.png" alt="" style={{ width: '40px', height: '40px' }} />
                  <span class="d-none d-lg-inline-flex ms-2 me-2">{user?.name}</span>
                </Link>
                <div class="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">
                  <Link href="#" class="dropdown-item">My Profile</Link>
                  <Link href="#" class="dropdown-item">Settings</Link>
                  <Link href="#" class="dropdown-item"><button onClick={logout}>Log Out</button></Link>
                </div>
              </div>
            </div>
          </nav>
          {/* <!-- Navbar End --> */}

          <div>
            <Routes>
              <Route path="/" >
                <Route index element={<Home />} />
                <Route path="/rapport" element={<RapportListe />} />
                <Route path="/detailleRapport/:id" element={<DetailleRapport />} />
                <Route path='/addRapport' element={<AddRapport />} />
                <Route path='/addedRapport' element={<AddedRapport />} />

                <Route path="/matches" element={<Matches />} />
                <Route path="/addMatche" element={<AddRapport />} />
                <Route path='/updateMatche/:id' element={<UpdateMatche />} />
                <Route path='/DeletedMatche' element={<DeletedMatche />} />
                <Route path='/updatedMatche' element={<UpdatedMatche />} />


                <Route path="/composants/stades" element={<Stades />} />
                <Route path="/composants/addStade" element={<AddStade />} />
                <Route path='/composants/DeletedStade' element={<DeletedStade />} />
                <Route path='/composants/updateStade/:id' element={<UpdateStade />} />
                <Route path='/composants/AddedStade' element={<AddedStade />} />
                <Route path='/composants/updatedStade' element={<UpdatedStade />} />

                <Route path="/composants/clubs" element={<ClubListe />} />
                <Route path="/composants/addClub" element={<AddClub />} />
                <Route path='/composants/addedClub' element={<AddedClub />} />
                <Route path='/composants/deletedClub' element={<DeletedClub />} />
                <Route path='/composants/updateClub/:id' element={<UpdateClub />} />
                <Route path='/composants/updatedClub' element={<UpdatedClub />} />

                <Route path='/composants/arbitres' element={<ArbiTreListe />} />
                <Route path='/composants/addArbitre' element={<AddArbitre />} />
                <Route path='/composants/updateArbitre/:id' element={<UpdateArbitre />} />
                <Route path='/composants/addedArbitre' element={<AddedArbitre />} />
                <Route path='/composants/deletedArbitre' element={<DeletedArbitre />} />
                <Route path='/composants/updatedArbitre' element={<UpdatedArbitre />} />

                <Route path='/composants/delegue' element={<DelegueListe />} />
                <Route path='/composants/addDelegue' element={<AddDelegue />} />
                <Route path='/composants/updateDelegue/:id' element={<UpdateDelegue />} />
                <Route path='/composants/addedDelegue' element={<AddedDelegue />} />
                <Route path='/composants/deletedDelegue' element={<DeletedDelegue />} />
                <Route path='/composants/updatedDelegue' element={<UpdatedDelegue />} />

                <Route path='/composants/joueur' element={<JoueurListe />} />
                <Route path='/composants/addJoueur' element={<AddJoueur />} />
                <Route path='/composants/updateJoueur/:id' element={<UpdateJoueur />} />
                <Route path='/composants/addedJoueur' element={<AddedJoueur />} />
                <Route path='/composants/deletedJoueur' element={<DeletedJoueur />} />
                <Route path='/composants/updatedJoueur' element={<UpdatedJoueur />} />

                <Route path='/composants/villes' element={<VillesListe />} />
                <Route path='/composants/addVille' element={<AddVille />} />
                <Route path='/composants/updateVille/:id' element={<UpdateVille />} />
                <Route path='/composants/addedVille' element={<AddedVille />} />
                <Route path='/composants/deletedVille' element={<DeletedVille />} />
                <Route path='/composants/updatedVille' element={<UpdatedVille />} />
              </ Route>
            </Routes>
            {/* <RouterProvider router={router}/> */}
          </div>
        </div>


      </div >

      {/* Back to Top  */}
      <a href="#" class="btn btn-lg btn-warning back-to-top"><i class="fa-solid fa-arrow-up text-dark"></i></a>
      {/* <!-- Content End --> */}

    </>
  );
}

export default App;

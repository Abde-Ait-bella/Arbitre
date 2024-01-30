import { React, useEffect, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import axios from 'axios';





export function Avert(props) {

    const [state, setState] = useState({
        joueurs: [],
        joueursCreat: [],
        joueursLicence: [],
        clubs: [],
    });

    const [avert, setAvert] = useState([{}]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const [joueurResponse, clubResponse, matcheRespose] = await Promise.all([
                    axios.get('http://localhost:8000/api/joueur'),
                    axios.get('http://localhost:8000/api/club'),
                    axios.get('http://localhost:8000/api/matche')
                ]);

                const dataJoueurs = joueurResponse.data;
                const optionJoueurs = dataJoueurs?.map(item => ({
                    value: item.nom,
                    label: item.nom.toUpperCase(),
                    name: "nom"
                }))
                const optionJoueursLic4ence = dataJoueurs?.map(item => ({
                    value: item.joueur_numero_licence,
                    label: item.joueur_numero_licence.toUpperCase(),
                    name: "joueur_numero_licence"
                }))

                const dataClubs = clubResponse.data;
                const optionClubs = dataClubs?.map(item => ({
                    value: item.id,
                    label: "(" + item.nom + ")" + item.abbr,
                    name: "club_id"
                }))

                const dataMatch = matcheRespose.data;
                if (!dataMatch || dataMatch.length === 0) {
                    var matchNamber = [0]
                } else (
                    matchNamber = dataMatch.map(item => item.id)
                )

                setState(prevData => ({
                    ...prevData,
                    clubs: optionClubs,
                    joueurs: optionJoueurs,
                    joueursLicence: optionJoueursLic4ence,
                    matchNamber: parseInt(matchNamber.pop() + 1)
                }))
                setOptionsJ(optionJoueurs);
                setOptionsLicence(optionJoueursLic4ence);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    //--------select nom joueur

    const createOptionJ = (label) => ({
        label: label.toUpperCase(),
        value: label.toLowerCase(),
        name: "nom"
    });

    const [isLoadingJ, setIsLoadingJ] = useState(false);
    const [optionsJ, setOptionsJ] = useState();
    const [valueJ, setValueJ] = useState();

    const handleCreate = (inputValue) => {
        setIsLoadingJ(true);
        setTimeout(() => {
            const newOption = createOptionJ(inputValue);
            setIsLoadingJ(false);
            setOptionsJ((prev) => [...prev, newOption]);
        }, 1000);
    };

    const handleAvertSelectChangeJ = (event, index) => {
        let valeur = event
        if (valeur === null) {
            valeur = {
                value: "",
                name: "nom"
            }
            const { name, value } = valeur;
            const newAverts = [...avert];
            newAverts[index][name] = value;
            setAvert(newAverts);


        } else {
            setValueJ(event)
            const { name, value } = valeur;
            const newAverts = [...avert];
            newAverts[index][name] = value;
            setAvert(newAverts);
        }
        setValueJ(event);
    }

    //-----select licence de joueur

    const createOptionLicence = (label) => ({
        label: label.toUpperCase(),
        value: label.toUpperCase(),
        name: "joueur_numero_licence"
    });


    const [isLoadingLicence, setIsLoadingLicence] = useState(false);
    const [optionsLicence, setOptionsLicence] = useState();
    const [valueLicence, setValueLicence] = useState();


    const handleCreateLicence = (inputValue) => {
        setIsLoadingLicence(true);
        setTimeout(() => {
            const newOption = createOptionLicence(inputValue);
            setIsLoadingLicence(false);
            setOptionsLicence((prev) => [...prev, newOption]);
            setValueLicence(newOption);
        }, 1000);
    };

    const handleAvertSelectChangeLicence = (event, index) => {
        let valeur = event
        if (valeur === null) {
            valeur = {
                value: "",
                name: "joueur_numero_licence"
            }
            const { name, value } = valeur;
            const newAverts = [...avert];
            newAverts[index][name] = value;
            setAvert(newAverts);
        } else {
            setValueLicence(valeur)
            const { name, value } = valeur;
            const newAverts = [...avert];
            newAverts[index][name] = value;
            setAvert(newAverts);
        }
        setValueLicence(event);
    }


    const handleAvertSelectChange = (event, index) => {

        const { name, value } = event;
        const newAverts = [...avert];
        newAverts[index][name] = value;
        newAverts[index].matche_id = state.matchNamber;
        setAvert(newAverts);

    }

    console.log("data avert", avert)
    // console.log("data avertcount", avertCount)

    const handleAvertInputChange = (event, index) => {
        const { name, value } = event.target;
        const newAverts = [...avert];
        newAverts[index][name] = value;
        setAvert(newAverts);
    }


    const addRow = () => {
        setAvert([...avert, {}])
        setValueJ()
        setValueLicence()
    };

    const SuppRow = (index) => {
        // avert[index].filter((a) => a.index !== index)
        const newAverts = [...avert];
        newAverts.splice(index, 1);
        setAvert(newAverts);
        // const newAverts = [...avert];
        // newAverts.pop();
        // setAvert(newAverts);
    };

    const [isValide, setIsValide] = useState();

    const sendData = () => {
        props.dataAvert(avert);
        setIsValide(prev => !prev);
    };

    return (
        <>
            <div className="row my-2">
                <div className="col-md-12">
                    <div class=" card text-center bg-light text-white">
                        <div class="card-header bg-secondary">
                            العقوبات الانضباطية
                        </div>
                        <div class="card-body">
                            {avert?.map((item, index) =>
                            (
                                <div className="row  border border-secondary border-4 rounded py-3 px-2 my-1 mt-3" key={index}>
                                    <div className="form-group col-md-4">
                                        <label>الفريق</label>
                                        <div className="my-2">
                                            <CreatableSelect className='text-light' options={state.clubs} onChange={(event) => handleAvertSelectChange(event, index)} placeholder="اكتب و اختر" />
                                        </div>
                                    </div>
                                    <div className="form-group col-md-2">
                                        <label>نوع العقوبة</label>
                                        <div className="d-flex justify-content-center pt-3">
                                            <div class="form-check mx-2">
                                                <input class="form-check-input bg-warning border-0" type="radio" value="G" name="type" onChange={(event) =>handleAvertInputChange(event, index)} id="flexRadioDefault1" />
                                                <label class="form-check-label" for="flexRadioDefault1">
                                                    انذار
                                                </label>
                                            </div>
                                            <div class="form-check mx-2">
                                                <input class="form-check-input bg-danger border-0" type="radio" value="R" name="type" onChange={(event) =>handleAvertInputChange(event, index)} id="flexRadioDefault2" />
                                                <label class="form-check-label" for="flexRadioDefault2">
                                                    طرد
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label >اسم الاعب</label>
                                        <div className='my-2'>
                                            <CreatableSelect className='text-light'
                                                isClearable
                                                isDisabled={isLoadingJ}
                                                isLoading={isLoadingJ}
                                                onChange={(event) =>handleAvertSelectChangeJ(event, index)}
                                                onCreateOption={handleCreate}
                                                options={optionsJ}
                                                value={valueJ}
                                                placeholder="أكتب و اختر"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group col-md-2">
                                        <label >رقم الاعب</label>
                                        <div className='my-2'>
                                            <input type="text" name='joueur_numero' className="form-control bg-white border-light my-2" onChange={(event) =>handleAvertInputChange(event, index)} id="inputPassword4" />
                                        </div>
                                    </div>
                                    <div className="form-group col-md-3">
                                        <label >رقم الرخصة</label>
                                        <div className='my-2'>
                                            <CreatableSelect className='text-light'
                                                isClearable
                                                isDisabled={isLoadingLicence}
                                                isLoading={isLoadingLicence}
                                                onChange={(event) =>handleAvertSelectChangeLicence(event, index)}
                                                onCreateOption={handleCreateLicence}
                                                options={optionsLicence}
                                                value={valueLicence}
                                                placeholder='أكتب و اختر'
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group col-md-7">
                                        <label >سبب الانذار</label>
                                        <div className='my-2'>
                                            <input type="text" name='cause' onChange={(event) =>handleAvertInputChange(event, index)} className="form-control bg-white border-light mt-2 mb-2" id="inputPassword4" />
                                        </div>
                                    </div>
                                    <div className="form-group col-md-2">
                                        <label >الدقيقة</label>
                                        <div className='my-2'>
                                            <input type="text" name='minute' onChange={(event) =>handleAvertInputChange(event, index)} className="form-control bg-white border-light mt-2 mb-2" id="inputPassword4" />
                                        </div>
                                    </div>
                                    <div className='mt-2'>
                                        <button className='btn btn-danger moin rounded-pill' onClick={() => SuppRow(index)}><i class="fa-solid fa-xmark"></i></button>
                                    </div>
                                </div>
                            ))}
                            <div className='d-flex justify-content-center mt-3'>
                                <div>
                                    <button className='btn btn-warning rounded-pill' onClick={addRow}><i class="fa-solid fa-plus"></i></button>
                                </div>
                            </div>
                            <div className='d-flex justify-content-right pt-2'>
                                <button className={`btn ${isValide ? 'bg-warning text-danger' : 'bg-secondary text-white'}`} onClick={sendData}>Valider</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

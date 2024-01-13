import { React, useEffect, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import axios from 'axios';


export function Buts(props) {

    const [state, setState] = useState({
        joueurs: [],
        joueursCreat: [],
        joueursLicence: [],
        clubs: [],
    });

    const [buts, setButs] = useState([{}]);



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
                    name: "joueur_nom"
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

    //--------Sélection joueur

    const createOptionJ = (label: string) => ({
        label: label.toUpperCase(),
        value: label.toLowerCase(),
        name: "joueur_nom"
    });

    const [isLoadingJ, setIsLoadingJ] = useState(false);
    const [optionsJ, setOptionsJ] = useState();
    const [valueJ, setValueJ] = useState();

    const handleCreateJ = (inputValue: string) => {
        setIsLoadingJ(true);
        setTimeout(() => {
            const newOption = createOptionJ(inputValue);
            setIsLoadingJ(false);
            setOptionsJ((prev) => [...prev, newOption]);
            setValueJ(newOption);
        }, 1000);
    };

    const handleChangeSelectJ = (event, index) => {
        let valeur = event
        if (valeur === null) {
            valeur = {
                value: "",
                name: "joueur_nom"
            }
            const { name, value } = valeur;
            const newBut = [...buts];
            newBut[index][name] = value;
            setButs(newBut);


        } else {
            setValueJ(event)
            const { name, value } = valeur;
            const newBut = [...buts];
            newBut[index][name] = value;
            setButs(newBut);
        }
        setValueJ()
    }


    //-----Sélection licence de joueur entrant

    const createOptionLicence = (label: string) => ({
        label: label.toUpperCase(),
        value: label.toLowerCase().replace(/\W/g, ''),
        name: "joueur_numero_licence"
    });


    const [isLoadingLicence, setIsLoadingLicence] = useState(false);
    const [optionsLicence, setOptionsLicence] = useState();
    const [valueLicence, setValueLicence] = useState();


    const handleCreateLicence = (inputValue: string) => {
        setIsLoadingLicence(true);
        setTimeout(() => {
            const newOption = createOptionLicence(inputValue);
            setIsLoadingLicence(false);
            setOptionsLicence((prev) => [...prev, newOption]);
            setValueLicence(newOption);
        }, 1000);
    };

    const handleChangeSelectLicence = (event, index) => {
        let valeur = event
        if (valeur === null) {
            valeur = {
                value: "",
                name: "joueur_numero_licence"
            }
            const { name, value } = valeur;
            const newBut = [...buts];
            newBut[index][name] = value;
            setButs(newBut);
        } else {
            setValueLicence(valeur)
            const { name, value } = valeur;
            const newBut = [...buts];
            newBut[index][name] = value;
            setButs(newBut);
        }
        setValueLicence(event);
    }


    const handleChangeSelect = (event, index) => {
        let valeur = event
        const { name, value } = valeur;
        const newBut = [...buts];
        newBut[index][name] = value;
        newBut[index].matche_id = state.matchNamber;
        setButs(newBut);


    }

    console.log('Data  Buts', buts)
    
    const handleChangeInput = (event, index) => {
        const { name, value } = event.target;
        const newBut = [...buts];
        newBut[index][name] = value;
        setButs(newBut);
    }


    const addRow = () => {
        setButs([...buts, {},]);
        setValueLicence()
        
    };

    const SuppRow = (index) => {
        const newBut = [...buts];
        newBut.splice(index, 1);
        setButs(newBut);
    };

    const [isValide, setIsValide] = useState();

    const sendData = () => {
        props.dataButs(buts);
        setIsValide(prev => !prev)
    };

    return (
        <>
            <div className="row my-2">
                <div className="col-md-12">
                    <div class=" card text-center bg-light text-white">
                        <div class="card-header bg-secondary">
                            الهدافون
                        </div>
                        <div class="card-body">
                            {buts?.map((item, index) => (
                                <div className="row border border-secondary border-4 rounded py-3 px-2 my-1 mt-3" key={index}>
                                    <div className="form-group col-md-4">
                                        <label>الفريق</label>
                                        <div className='my-2'>
                                            <CreatableSelect className='text-light' options={state.clubs} onChange={(event) => handleChangeSelect(event, index)} placeholder="اكتب و اختر" />
                                        </div>
                                    </div>
                                    <div className="form-group col-md-3">
                                        <label>اسم الاعب</label>
                                        <div className='my-2'>
                                            <CreatableSelect className='text-light'
                                                isClearable
                                                isDisabled={isLoadingJ}
                                                isLoading={isLoadingJ}
                                                onChange={(event) => handleChangeSelectJ(event, index)}
                                                onCreateOption={handleCreateJ}
                                                options={optionsJ}
                                                value={valueJ}
                                                placeholder="أكتب و اختر"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group col-md-3">
                                        <label >رقم رخصة</label>
                                        <div className='my-2'>
                                            <CreatableSelect className='text-light'
                                                isClearable
                                                isDisabled={isLoadingLicence}
                                                isLoading={isLoadingLicence}
                                                onChange={(event) => handleChangeSelectLicence(event, index)}
                                                onCreateOption={handleCreateLicence}
                                                options={optionsLicence}
                                                value={valueLicence}
                                                placeholder='أكتب و اختر'
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group col-md-2">
                                        <label >رقم الاعب</label>
                                        <div className='my-2'>
                                            <input type="text" name='joueur_numero' onChange={(event) => handleChangeInput(event, index)} className="form-control bg-white border-light mt-2 mb-2" id="inputPassword4" />
                                        </div>
                                    </div>
                                    <div className="form-group col-md-2">
                                        <label >الدقيقة</label>
                                        <div className='my-2'>
                                            <input type="text" name='minute' onChange={(event) => handleChangeInput(event, index)} className="form-control bg-white border-light mt-2 mb-2" id="inputPassword4" />
                                        </div>
                                    </div>
                                    <div>
                                        <button className='btn btn-danger moin rounded-pill' onClick={() => SuppRow(index)}><i class="fa-solid fa-xmark"></i></button>
                                    </div>
                                </div>
                            ))}
                            <div className='d-flex justify-content-center mt-3'>
                                <div>
                                    <button className='btn btn-warning rounded-pill' onClick={addRow}><i class="fa-solid fa-plus "></i></button>
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

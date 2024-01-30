import { React, useEffect, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import { useParams } from 'react-router-dom';
import axios from 'axios';


export function Changement(props) {

    const [state, setState] = useState({
        joueursEntre: [],
        joueursSort: [],
        JoueursLicenceE: [],
        JoueursLicenceS: [],
        joueursCreat: [],
        joueursLicence: [],
        clubs: [],
    });

    const [selectedSelect, setSelectedSelect] = useState({});

    const [changeUpdate, setChangeUpdate] = useState([]);
    const [changements, setChangements] = useState();

    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [joueurResponse, clubResponse, changeResponse] = await Promise.all([
                    axios.get('http://localhost:8000/api/joueur'),
                    axios.get('http://localhost:8000/api/club'),
                    axios.get('http://localhost:8000/api/changement')
                ]);

                const dataJoueurs = joueurResponse.data;
                const optionJoueursEntr = dataJoueurs?.map(item => ({
                    value: item.nom,
                    label: item.nom.toUpperCase(),
                    name: "joueur_nom_entr",
                    licence: item.joueur_numero_licence
                }))
                const optionJoueursSort = dataJoueurs?.map(item => ({
                    value: item.nom,
                    label: item.nom.toUpperCase(),
                    name: "joueur_nom_sort",
                    licence: item.joueur_numero_licence
                }))
                const optionJoueursLicenceE = dataJoueurs?.map(item => ({
                    value: item.joueur_numero_licence,
                    label: item.joueur_numero_licence.toUpperCase(),
                    name: "joueur_licence_entr"
                }))

                const optionJoueursLicenceS = dataJoueurs?.map(item => ({
                    value: item.joueur_numero_licence,
                    label: item.joueur_numero_licence.toUpperCase(),
                    name: "joueur_licence_sort"
                }))

                const dataClubs = clubResponse.data;
                const optionClubs = dataClubs?.map(item => ({
                    value: item.id,
                    label: "(" + item.nom + ")" + " " + item.abbr,
                    name: "club_id"
                }))

                setChangements(changeResponse.data)

                setState(prevData => ({
                    ...prevData,
                    clubs: optionClubs,
                    joueursEntre: optionJoueursEntr,
                    joueursSort: optionJoueursSort,
                    JoueursLicenceE: optionJoueursLicenceE,
                    JoueursLicenceS: optionJoueursLicenceS,
                }))

                setOptionsJEntr(optionJoueursEntr)
                setOptionsJSort(optionJoueursSort)
                setOptionsLicenceE(optionJoueursLicenceE)
                setOptionsLicenceS(optionJoueursLicenceS)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const changementData = changements?.filter((ch) => ch.matche_id === parseInt(id));


    const addState = () => {
        const newObjects = Array.from({ length: changementData?.length }, (_, index) => (
            {}
        ));
        if (changementData) {
            setSelectedSelect([...newObjects]);
            setChangeUpdate([...changementData]);
        }
    }

    useEffect(() => {
        addState();
    }, [changementData?.length])


    //--------Sélection joueur entrant

    const createOptionJEntr = (label) => ({
        label: label.toUpperCase(),
        value: label.toLowerCase(),
        name: "joueur_nom_entr"
    });

    const [isLoadingJEntr, setIsLoadingJEntr] = useState(false);
    const [optionsJEntr, setOptionsJEntr] = useState();

    const handleCreateJEntr = (inputValue) => {
        setIsLoadingJEntr(true);
        setTimeout(() => {
            const newOption = createOptionJEntr(inputValue);
            setIsLoadingJEntr(false);
            setOptionsJEntr((prev) => [...prev, newOption]);
        }, 1000);
    };

    const handleChangeSelectJEntr = (event, index) => {
        console.log(event);
        let valeur = event
        if (valeur === null) {
            valeur = {
                value: "",
                name: "joueur_nom_entr"
            }
        }
        const { name, value } = valeur;
        const newChnageUpdate = [...changeUpdate];
        newChnageUpdate[index][name] = value;
        setChangeUpdate(newChnageUpdate);

        const newSelect = [...selectedSelect];
        newSelect[index][name] = valeur;
        setSelectedSelect(newSelect)
    }


    /////////--------Sélection du joueur sortant

    const createOptionJSort = (label) => ({
        label: label.toUpperCase(),
        value: label.toLowerCase(),
        name: "joueur_nom_sort"
    });

    const [isLoadingJSort, setIsLoadingJSort] = useState(false);
    const [optionsJSort, setOptionsJSort] = useState();

    const handleCreateJSort = (inputValue) => {
        setIsLoadingJSort(true);
        setTimeout(() => {
            const newOption = createOptionJSort(inputValue);
            setIsLoadingJSort(false);
            setOptionsJSort((prev) => [...prev, newOption]);
        }, 1000);
    };

    const handleChangeSelectJSort = (event, index) => {
        let valeur = event
        if (valeur === null) {
            valeur = {
                value: "",
                name: "joueur_nom_sort"
            }
        }
        const { name, value } = valeur;
        const newChange = [...changeUpdate];
        newChange[index][name] = value;
        setChangeUpdate(newChange)

        const newSelect = [...selectedSelect];
        newSelect[index][name] = valeur;
        setSelectedSelect(newSelect)
    }

    //-----Sélection licence de joueur entrant

    const createOptionLicenceE = (label) => ({
        label: label.toUpperCase(),
        value: label.toLowerCase().replace(/\W/g, ''),
        name: "joueur_licence_entr"
    });


    const [isLoadingLicenceE, setIsLoadingLicenceE] = useState(false);
    const [optionsLicenceE, setOptionsLicenceE] = useState();

    const handleCreateLicenceE = (inputValue) => {
        setIsLoadingLicenceE(true);
        setTimeout(() => {
            const newOption = createOptionLicenceE(inputValue);
            setIsLoadingLicenceE(false);
            setOptionsLicenceE((prev) => [...prev, newOption]);
        }, 1000);
    };

    const handleChangeSelectLicenceE = (event, index) => {
        let valeur = event;
        if (valeur === null) {
            valeur = {
                value: "",
                name: "joueur_licence_entr"
            };
        }
        const { name, value } = valeur;

        const newChange = [...changeUpdate];
        newChange[index][name] = value;
        setChangeUpdate(newChange);

    };



    //-----Sélection licence de joueur sortant

    const createOptionLicenceS = (label) => ({
        label,
        value: label.toLowerCase(),
        name: "joueur_licence_sort"
    });


    const [isLoadingLicenceS, setIsLoadingLicenceS] = useState(false);
    const [optionsLicenceS, setOptionsLicenceS] = useState();


    const handleCreateLicenceS = (inputValue) => {
        setIsLoadingLicenceS(true);
        setTimeout(() => {
            const newOption = createOptionLicenceS(inputValue);
            setIsLoadingLicenceS(false);
            setOptionsLicenceS((prev) => [...prev, newOption]);
        }, 1000);
    };

    const handleChangeSelectLicenceS = (event, index) => {
        let valeur = event
        if (valeur === null) {
            valeur = {
                value: "",
                name: "joueur_licence_sort"
            }
        }
        const { name, value } = valeur;
        const newChange = [...changeUpdate];
        newChange[index][name] = value;
        setChangeUpdate(newChange)
    }

    const handleChangeSelect = (event, index) => {
        const { name, value } = event;
        const newChange = [...changeUpdate];
        newChange[index].matche_id = parseInt(id);
        newChange[index][name] = value;
        setChangeUpdate(newChange)
    }

    const handleChangeInput = (event, index) => {

        const { name, value } = event.target;
        const newChange = [...changeUpdate];
        newChange[index][name] = value;
        setChangeUpdate(newChange);
    }


    const addRow = () => {
        setChangeUpdate([...changeUpdate, {}])
    };

    const SuppRow = (index) => {

        const newChange = [...changeUpdate];
        newChange.splice(index, 1);
        setChangeUpdate(newChange);
    };

    const [isValide, setIsValide] = useState();

    const sendData = () => {
        props.dataChangement(changeUpdate);
        setIsValide(prev => !prev);
    };


    return (
        <>
            <div className="row my-2">
                <div className="col-md-12">
                    <div class=" card text-center bg-light text-white">
                        <div class="card-header bg-secondary">
                            التغييرات
                        </div>
                        <div class="card-body">
                            {changeUpdate ?
                                (
                                    <div>
                                        {changeUpdate?.map((item, index) =>
                                            <div className="row  border border-secondary border-4 rounded py-3 px-2 my-1 mt-3" key={index}>
                                                <div className="form-group col-md-3">
                                                    <label>الفريق</label>
                                                    <div className='my-2'>
                                                        <CreatableSelect className='text-light' value={state?.clubs.find((c) => c.value === item?.club_id)} options={state.clubs} onChange={(event) => handleChangeSelect(event, index)} placeholder="اكتب" />
                                                    </div>
                                                </div>
                                                <div className="form-group col-md-4">
                                                    <label>اسم الاعب الداخل</label>
                                                    <div className='my-2'>
                                                        <CreatableSelect className='text-light'
                                                            isClearable
                                                            isDisabled={isLoadingJEntr}
                                                            isLoading={isLoadingJEntr}
                                                            onChange={(event) => handleChangeSelectJEntr(event, index)}
                                                            onCreateOption={handleCreateJEntr}
                                                            options={optionsJEntr}
                                                            value={selectedSelect[index]?.joueur_nom_entr ? selectedSelect[index]?.joueur_nom_entr : state?.joueursEntre.find((j) => j.licence === changementData[index]?.joueur_licence_entr)}
                                                            placeholder="أكتب او اختر"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group col-md-2">
                                                    <label >رقم الاعب الداخل</label>
                                                    <div className='my-2'>
                                                        {/* <input type="text" name='joueur_num_entr' value={selectedSelect[index]?.joueur_num_sort ? selectedSelect[index]?.joueur_num_sort : item?.joueur_num_sort} onChange={(event) => handleChangeInput(event, index)} className="form-control bg-white border-light my-2" id="inputPassword4" /> */}
                                                        <input type="text" name='joueur_num_entr' value={item?.joueur_num_entr} className="form-control bg-white border-light my-2" onChange={(event) => handleChangeInput(event, index)} id="inputPassword4" />

                                                    </div>
                                                </div>
                                                <div className="form-group col-md-3">
                                                    <label >رقم رخصة الداخل</label>
                                                    <div className='my-2'>
                                                        <CreatableSelect className='text-light'
                                                            isClearable
                                                            isDisabled={isLoadingLicenceE}
                                                            isLoading={isLoadingLicenceE}
                                                            onChange={(event) => handleChangeSelectLicenceE(event, index)}
                                                            onCreateOption={handleCreateLicenceE}
                                                            options={optionsLicenceE}
                                                            value={state?.JoueursLicenceE.find((j) => j.value === item?.joueur_licence_entr)}
                                                            placeholder='أكتب واختر'
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group col-md-4">
                                                    <label >اسم الاعب الخارج</label>
                                                    <div className='my-2'>
                                                        <CreatableSelect className='text-light'
                                                            isClearable
                                                            isDisabled={isLoadingJSort}
                                                            isLoading={isLoadingJSort}
                                                            onChange={(event) => handleChangeSelectJSort(event, index)}
                                                            onCreateOption={handleCreateJSort}
                                                            options={optionsJSort}
                                                            value={selectedSelect[index]?.joueur_nom_sort ? selectedSelect[index]?.joueur_nom_sort : state?.joueursSort.find((c) => c.licence === changementData[index]?.joueur_licence_sort)}
                                                            placeholder="أكتب او اختر"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group col-md-3">
                                                    <label >رقم رخصة الخارج</label>
                                                    <div className='my-2'>
                                                        <CreatableSelect className='text-light'
                                                            isClearable
                                                            isDisabled={isLoadingLicenceS}
                                                            isLoading={isLoadingLicenceS}
                                                            onChange={(event) => handleChangeSelectLicenceS(event, index)}
                                                            onCreateOption={handleCreateLicenceS}
                                                            options={optionsLicenceS}
                                                            value={state?.JoueursLicenceE.find((j) => j.value === item?.joueur_licence_sort)}
                                                            placeholder='أكتب واختر'
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group col-md-2">
                                                    <label >رقم الاعب الخارج</label>
                                                    <div className='my-2'>
                                                        <input type="text" name='joueur_num_sort' value={item?.joueur_num_sort} onChange={(event) => handleChangeInput(event, index)} className="form-control bg-white border-light my-2" id="inputPassword4" />
                                                    </div>
                                                </div>
                                                <div className="form-group col-md-2">
                                                    <label >الدقيقة</label>
                                                    <div className='my-2'>
                                                        <input type="text" name='minute' value={item?.minute} onChange={(event) => handleChangeInput(event, index)} className="form-control bg-white border-light mt-2 mb-2" id="inputPassword4" />
                                                    </div>
                                                </div>
                                                <div className='mt-2'>
                                                    <button className='btn btn-danger moin rounded-pill' onClick={() => SuppRow(index)}><i class="fa-solid fa-xmark"></i></button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )
                                :
                                (<h1>...</h1>)
                            }
                            <div className='d-flex justify-content-center mt-3'>
                                <div>
                                    <button className='btn btn-warning rounded-pill' onClick={addRow}><i class="fa-solid fa-plus"></i></button>
                                </div>
                            </div>
                            <div className='d-flex justify-content-right pt-2'>
                                <button className={`btn  ${isValide ? 'btn-warning text-danger' : 'btn-secondary'}`} onClick={sendData}>Valider</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

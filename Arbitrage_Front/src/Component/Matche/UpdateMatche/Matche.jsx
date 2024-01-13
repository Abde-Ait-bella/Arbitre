import { React, useEffect, useState } from 'react';
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export function Matche(props) {

    const [state, setState] = useState({
        centre: [],
        assistant_1: [],
        assistant_2: [],
        delegue: [],
        clubs: [],
        clubs_1: [],
        clubs_2: [],
        stades: [],
        villes: [],
        competition: [],
        saison: [],
        category: [],
        avert: [
            { id: 1, value: "G", label: 'انذار' },
            { id: 2, value: "R", label: 'طرد' },
        ],
        joueurs: [],
        joueursLicence: [],
        centreVille: [],
        assistant_1_Ville: [],
        assistant_2_Ville: [],
        delegueVille: [],
        dernierIdMatche: [],
        matches: []
    });


    useEffect(() => {

        axios.get('http://localhost:8000/api/arbitre')
            .then((res) => {
                const data = res.data
                const transformedOption = data.map(item => ({
                    value: item.id,
                    label: item.nom.toUpperCase() + " " + item.prenom.toUpperCase(),
                    type: item.type,
                    ville: item.ville,
                    name: "arbitre_c_id"
                }))
                const centre = transformedOption.filter(item => item.type === 'center')
                const assistant = transformedOption.filter(item => item.type === 'Assistant')


                const arbireAssistant_1 = assistant.map(item => ({
                    value: item.value,
                    label: item.label,
                    type: item.type,
                    ville: item.ville,
                    name: "arbitre_a1_id"
                }))
                const arbireAssistant_2 = assistant.map(item => ({
                    value: item.value,
                    label: item.label,
                    type: item.type,
                    ville: item.ville,
                    name: "arbitre_a2_id"
                }))

                setState(prevData => ({
                    ...prevData,
                    centre: centre,
                    assistant_1: arbireAssistant_1,
                    assistant_2: arbireAssistant_2,
                }))
            })
        axios.get('http://localhost:8000/api/delegue')
            .then((res) => {
                const dataDelegue = res.data
                const optionDelegue = dataDelegue.map(item => ({
                    value: item.id,
                    label: item.nom.toUpperCase() + " " + item.prenom.toUpperCase(),
                    ville: item.ville,
                    name: "delegue_id"
                }))
                setState(prevData => ({
                    ...prevData,
                    delegue: optionDelegue
                }))
            })
        axios.get('http://localhost:8000/api/club')
            .then((res) => {
                const dataClubs = res.data
                const optionClubs = dataClubs.map(item => ({
                    value: item.id,
                    label: "(" + item.nom + ")" + item.abbr.toUpperCase(),
                    stade: item.stade,
                    name: "club"
                }))
                const optionClubs_1 = dataClubs.map(item => ({
                    value: item.id,
                    label: "(" + item.nom + ")" + item.abbr.toUpperCase(),
                    stade: item.stade,
                    name: "club_id_1"
                }))
                const optionClubs_2 = dataClubs.map(item => ({
                    value: item.id,
                    label: "(" + item.nom + ")" + item.abbr.toUpperCase(),
                    stade: item.stade,
                    name: "club_id_2"
                }))
                setState(prevData => ({
                    ...prevData,
                    clubs: optionClubs,
                    clubs_1: optionClubs_1,
                    clubs_2: optionClubs_2
                }))
            })
        axios.get('http://localhost:8000/api/stade')
            .then((res) => {
                const dataStades = res.data
                const optionStades = dataStades.map(item => ({
                    value: item.id,
                    label: item.nom,
                    ville: item.ville,
                    name: "stade_id"
                }))
                setState(prevData => ({
                    ...prevData,
                    stades: optionStades
                }))
            })
        axios.get('http://localhost:8000/api/ville')
            .then((res) => {
                const dataVilles = res.data
                const optionVilles = dataVilles.map(item => ({
                    value: item.id,
                    label: item.nom,
                    name: "ville_id"
                }))
                const optionCentre_ville = dataVilles.map(item => ({
                    value: item.id,
                    label: item.nom,
                    name: "centre_ville"
                }))
                const optionAssistant_1_ville = dataVilles.map(item => ({
                    value: item.id,
                    label: item.nom,
                    name: "assistant_1_ville"
                }))
                const optionAssistant_2_ville = dataVilles.map(item => ({
                    value: item.id,
                    label: item.nom,
                    name: "assistant_2_ville"
                }))
                const optionDelegue_ville = dataVilles.map(item => ({
                    value: item.id,
                    label: item.nom,
                    name: "delegue_ville"
                }))
                setState(prevData => ({
                    ...prevData,
                    villes: optionVilles,
                    centreVille: optionCentre_ville,
                    assistant_1_Ville: optionAssistant_1_ville,
                    assistant_2_Ville: optionAssistant_2_ville,
                    delegueVille: optionDelegue_ville
                }))
            })
        axios.get('http://localhost:8000/api/competition')
            .then((res) => {
                const dataCompetition = res.data
                const optionCompetition = dataCompetition.map(item => ({
                    value: item.id,
                    label: item.nom,
                    name: "competition_id"
                }))
                setState(prevData => ({
                    ...prevData,
                    competition: optionCompetition
                }))
            })
        axios.get('http://localhost:8000/api/saison')
            .then((res) => {
                const dataSaison = res.data
                const optionSaison = dataSaison.map(item => ({
                    value: item.id,
                    label: item.nom,
                    name: "saison_id"
                }))
                setState(prevData => ({
                    ...prevData,
                    saison: optionSaison
                }))
            })
        axios.get('http://localhost:8000/api/category')
            .then((res) => {
                const dataCategory = res.data
                const optionCategory = dataCategory.map(item => ({
                    value: item.id,
                    label: item.nom,
                    name: "categorie_id"
                }))
                setState(prevData => ({
                    ...prevData,
                    category: optionCategory
                }))
            })
        axios.get('http://localhost:8000/api/joueur')
            .then((res) => {
                const dataJoueurs = res.data
                const optionJoueurs = dataJoueurs?.map(item => ({
                    value: item.joueur_nom,
                    label: item.joueur_nom,
                    name: "joueur"
                }))
                const optionJoueursLicence = dataJoueurs?.map(item => ({
                    value: item.joueur_numero_licence,
                    label: item.joueur_numero_licence,
                    name: "joueur_numero_licence"
                }))
                setState(prevData => ({
                    ...prevData,
                    joueurs: optionJoueurs,
                    joueursLicence: optionJoueursLicence
                }))
            })
        axios.get('http://localhost:8000/api/matche')
            .then((res) => {
                const dernierId = Math.max(...res.data.map(match => match.id), 0);
                setState(prevData => ({
                    ...prevData,
                    dernierIdMatche: dernierId + 1
                }))
            })
        axios.get('http://localhost:8000/api/matche')
            .then((res) => {
                setState(prevData => ({
                    ...prevData,
                    matches: res.data
                }))
            })
            .catch((error) => {
                console.error("Une erreur s'est produite lors de la récupération des données de Matches : " + error);
            })

    }, [])

    const { id } = useParams();
    const matche = state.matches.find((m) => m.id === parseInt(id))

    const saisonDefault = state.saison.find((s) => s.value === matche?.saison_id)
    const competitionDefault = state.competition.find((s) => s.value === matche?.competition_id)
    const categoryDefault = state.category.find((s) => s.value === matche?.categorie_id)
    const arbitreDefault = state.centre.find((s) => s.value === matche?.arbitre_c_id)
    const arbitre_a1_idDefault = state.assistant_1.find((s) => s.value === matche?.arbitre_a1_id)
    const arbitre_a2_idDefault = state.assistant_2.find((s) => s.value === matche?.arbitre_a2_id)
    const delegue_idDefaulte = state.delegue.find((s) => s.value === matche?.delegue_id)
    const clubs_1Defaulte = state.clubs_1.find((s) => s.value === matche?.club_id_1)
    const clubs_2Defaulte = state.clubs_2.find((s) => s.value === matche?.club_id_2)

    const [inputValueUpdate, setInputValueUpdate] = useState();

    const [selectedSelect, setSelectedSelect] = useState({
        name: "",
        villeCentre: "",
        villeAssistant_1: "",
        villeAssistant_2: "",
        villeDelegue: "",
        stade: "",
        stadeClub_1: "",
        saison_id: "",
        date: "",
        competition: "",
        arbitre_c_id: "",
        arbitre_a1_id: "",
        arbitre_a2_id: "",
        delegue_id: "",
        club_id_1: "",
        club_id_2: "",
        result_club_1: "",
        result_club_2: "",
        temps: "",
    });


    const handleInputChange = (event) => {

        var dateLasteValue = event?.target.name === "date" ? event?.target.value : selectedSelect?.date;
        var result_club_1LasteValue = event?.target.name === "result_club_1" ? event?.target.value : selectedSelect?.result_club_1;
        var result_club_2LasteValue = event?.target.name === "result_club_2" ? event?.target.value : selectedSelect?.result_club_2;
        var tempsLasteValue = event?.target.name === "temps" ? event?.target.value : selectedSelect?.temps;
        var temp_presence_agents_sécuritéLasteValue = event?.target.name === "temp_presence_agents_sécurité" ? event?.target.value : selectedSelect?.temp_presence_agents_sécurité;
        var temp_presence_delegueLasteValue = event?.target.name === "temp_presence_delegue" ? event?.target.value : selectedSelect?.temp_presence_delegue;
        var nombre_agents_sécuritéLasteValue = event?.target.name === "nombre_agents_sécurité" ? event?.target.value : selectedSelect?.nombre_agents_sécurité;
        var etat_stadeLasteValue = event?.target.name === "etat_stade" ? event?.target.value : selectedSelect?.etat_stade;
        var etat_vestiaireLasteValue = event?.target.name === "etat_vestiaire" ? event?.target.value : selectedSelect?.etat_vestiaire;
        var rapport_suppLasteValue = event?.target.name === "rapport_supp" ? event?.target.value : selectedSelect?.rapport_supp;

        const { name, value } = event.target;

        setInputValueUpdate(prevValues => ({
            ...prevValues,
            [name]: value,
            date: dateLasteValue ? dateLasteValue : matche?.date,
            result_club_1: result_club_1LasteValue ? result_club_1LasteValue : matche?.result_club_1,
            result_club_2: result_club_2LasteValue ? result_club_2LasteValue : matche?.result_club_2,
            temps: tempsLasteValue ? tempsLasteValue : matche?.temps,
            temp_presence_agents_sécurité: temp_presence_agents_sécuritéLasteValue ? temp_presence_agents_sécuritéLasteValue : matche?.temp_presence_agents_sécurité,
            temp_presence_delegue: temp_presence_delegueLasteValue ? temp_presence_delegueLasteValue : matche?.temp_presence_delegue,
            nombre_agents_sécurité: nombre_agents_sécuritéLasteValue ? nombre_agents_sécuritéLasteValue : matche?.nombre_agents_sécuritéLasteValue,
            etat_stade: etat_stadeLasteValue ? etat_stadeLasteValue : matche?.etat_stade,
            etat_vestiaire: etat_vestiaireLasteValue ? etat_vestiaireLasteValue : matche?.etat_vestiaire,
            rapport_supp: rapport_suppLasteValue ? rapport_suppLasteValue : matche?.rapport_supp,

            stade_id: selectedSelect?.stade ? selectedSelect?.stade.value : matche?.stade_id,
            ville_id: selectedSelect?.ville_id ? selectedSelect?.ville_id : matche?.ville.id,
            saison_id: selectedSelect?.saison_id ? selectedSelect?.saison_id : saisonDefault?.value,
            competition_id: selectedSelect?.competition?.value ? selectedSelect?.competition?.value : competitionDefault?.value,
            categorie_id: selectedSelect?.categorie_id ? selectedSelect?.categorie_id : categoryDefault?.value,
            arbitre_c_id: selectedSelect?.arbitre_c_id ? selectedSelect?.arbitre_c_id : arbitreDefault?.value,
            arbitre_a1_id: selectedSelect?.arbitre_a1_id ? selectedSelect?.arbitre_a1_id : arbitre_a1_idDefault?.value,
            arbitre_a2_id: selectedSelect?.arbitre_a2_id ? selectedSelect?.arbitre_a2_id : arbitre_a2_idDefault?.value,
            delegue_id: selectedSelect?.delegue_id ? selectedSelect?.delegue_id : delegue_idDefaulte?.value,
            club_id_1: selectedSelect?.club_id_1 ? selectedSelect?.club_id_1 : clubs_1Defaulte?.value,
            club_id_2: selectedSelect?.club_id_2 ? selectedSelect?.club_id_2 : clubs_2Defaulte?.value,
        }));

        setSelectedSelect(prevValues => ({
            ...prevValues,
            name: event?.name,
            date: dateLasteValue,
            result_club_1: result_club_1LasteValue,
            result_club_2: result_club_2LasteValue,
            temps: tempsLasteValue,
            temp_presence_agents_sécurité: temp_presence_agents_sécuritéLasteValue,
            temp_presence_delegue: temp_presence_delegueLasteValue,
            nombre_agents_sécurité: nombre_agents_sécuritéLasteValue,
            etat_stade: etat_stadeLasteValue,
            etat_vestiaire: etat_vestiaireLasteValue,
            rapport_supp: rapport_suppLasteValue
        }))
    };

    const handleSelectChange = (event) => {

        const { name, value } = event;

        var stadeClub_1 = event?.name === "club_id_1" ? event?.stade : selectedSelect.stadeClub_1
        if (event?.name === "club_id_1") {
            stadeClub_1 = state.stades.find((s) => stadeClub_1?.id === s.value)
        } else if (event?.name === "stade_id") {
            stadeClub_1 = event
        }


        var villeCentre = event?.name === "arbitre_c_id" ? event.ville : selectedSelect.villeCentre
        if (event?.name === "arbitre_c_id") {
            villeCentre = state.villes.find((v) => villeCentre?.id === v.value)
        }

        var villeAssistant_1 = event?.name === "arbitre_a1_id" ? event.ville : selectedSelect.villeAssistant_1
        if (event?.name === "arbitre_a1_id") {
            villeAssistant_1 = state.villes.find((v) => villeAssistant_1?.id === v.value)
        }

        var villeAssistant_2 = event?.name === "arbitre_a2_id" ? event.ville : selectedSelect.villeAssistant_2
        if (event?.name === "arbitre_a2_id") {
            villeAssistant_2 = state.villes.find((v) => villeAssistant_2?.id === v.value)
        }

        var villeDelegue = event?.name === "delegue_id" ? event.ville : selectedSelect.villeDelegue
        if (event?.name === "delegue_id") {
            villeDelegue = state.villes.find((v) => villeDelegue?.id === v.value)
        }

        var saisonLasteValue = event?.name === "saison_id" ? event : selectedSelect?.saison_id;
        var competitionLasteValue = event?.name === "competition_id" ? event : selectedSelect?.competition;
        var categoryLasteValue = event?.name === "categorie_id" ? event : selectedSelect?.category;
        var arbitreLasteValue = event?.name === "arbitre_c_id" ? event : selectedSelect?.arbitre_c_id;
        var arbitre_a1LasteValue = event?.name === "arbitre_a1_id" ? event : selectedSelect?.arbitre_a1_id;
        var arbitre_a2LasteValue = event?.name === "arbitre_a2_id" ? event : selectedSelect?.arbitre_a2_id;
        var delegueLasteValue = event?.name === "delegue_id" ? event : selectedSelect?.delegue_id;
        var club_1LasteValue = event?.name === "club_id_1" ? event : selectedSelect?.club_id_1;
        var club_2LasteValue = event?.name === "club_id_2" ? event : selectedSelect?.club_id_2;

        setInputValueUpdate(prevValues => ({
            ...prevValues,
            [name]: value,
            stade_id: stadeClub_1?.value ? stadeClub_1?.value : matche?.stade_id,
            ville_id: stadeClub_1?.ville?.id ? stadeClub_1?.ville?.id : matche?.ville.id,
            saison_id: saisonLasteValue.value ? saisonLasteValue.value : saisonDefault?.value,
            competition_id: competitionLasteValue?.value ? competitionLasteValue?.value : competitionDefault?.value,
            categorie_id: categoryLasteValue?.value ? categoryLasteValue?.value : categoryDefault?.value,
            arbitre_c_id: arbitreLasteValue?.value ? arbitreLasteValue?.value : arbitreDefault?.value,
            arbitre_a1_id: arbitre_a1LasteValue?.value ? arbitre_a1LasteValue?.value : arbitre_a1_idDefault?.value,
            arbitre_a2_id: arbitre_a2LasteValue?.value ? arbitre_a2LasteValue?.value : arbitre_a2_idDefault?.value,
            delegue_id: delegueLasteValue?.value ? delegueLasteValue?.value : delegue_idDefaulte?.value,
            club_id_1: club_1LasteValue?.value ? club_1LasteValue?.value : clubs_1Defaulte?.value,
            club_id_2: club_2LasteValue?.value ? club_2LasteValue?.value : clubs_2Defaulte?.value,

            date: selectedSelect?.date ? selectedSelect?.date : matche?.date,
            result_club_1: selectedSelect?.result_club_1 ? selectedSelect?.result_club_1 : matche?.result_club_1,
            result_club_2: selectedSelect?.result_club_2 ? selectedSelect?.result_club_2 : matche?.result_club_2,
            temps: selectedSelect?.temps ? selectedSelect?.temps : matche?.temps,
            temp_presence_agents_sécurité: selectedSelect?.temp_presence_agents_sécurité ? selectedSelect?.temp_presence_agents_sécurité : matche?.temp_presence_agents_sécurité,
            temp_presence_delegue: selectedSelect?.temp_presence_delegue ? selectedSelect?.temp_presence_delegue : matche?.temp_presence_delegue,
            nombre_agents_sécurité: selectedSelect?.nombre_agents_sécurité ? selectedSelect?.nombre_agents_sécurité : matche?.nombre_agents_sécurité,
            etat_stade: selectedSelect?.etat_stade ? selectedSelect?.etat_stade : matche?.etat_stade,
            etat_vestiaire: selectedSelect?.etat_vestiaire ? selectedSelect?.etat_vestiaire : matche?.etat_vestiaire,
            rapport_supp: selectedSelect?.rapport_supp ? selectedSelect?.rapport_supp : matche?.rapport_supp
        }));

        setSelectedSelect(prevValues => ({
            ...prevValues,
            name: event?.name,
            villeCentre: villeCentre,
            villeAssistant_1: villeAssistant_1,
            villeAssistant_2: villeAssistant_2,
            villeDelegue: villeDelegue,
            stadeClub_1: stadeClub_1,
            saison_id: saisonLasteValue,
            competition: competitionLasteValue,
            category: categoryLasteValue,
            arbitre_c_id: arbitreLasteValue,
            arbitre_a1_id: arbitre_a1LasteValue,
            arbitre_a2_id: arbitre_a2LasteValue,
            delegue_id: delegueLasteValue,
            club_id_1: club_1LasteValue,
            club_id_2: club_2LasteValue,
            ville_id: stadeClub_1?.ville?.id,
        }))

    };

    const [isValide, setIsValide] = useState();

    const sendData = () => {
        props.dataMatche(inputValueUpdate ? inputValueUpdate : matche);
        setIsValide((prev) => !prev);
    }

    return (
        <>
            <div >
                <div className="row my-2 mx-2">
                    <div className="form-group col-md-3">
                        <label className='text-white' htmlFor="inputEmail4">الموسم الرياضي</label>
                        <div className='my-2'>
                            <Select isClearable value={selectedSelect?.saison_id ? selectedSelect?.saison_id : saisonDefault} name={selectedSelect} onChange={handleSelectChange} options={state.saison} placeholder="أكتب..." />
                        </div>
                    </div>
                    <div className="form-group col-md-3">
                        <label className='text-white' htmlFor="inputPassword4">التاريخ</label>
                        <input type="date" name='date' value={selectedSelect?.date ? selectedSelect?.date : matche?.date} onChange={handleInputChange} className="form-control bg-white border-light mt-2 mb-2" id="inputPassword4" />
                    </div>
                    <div className="form-group col-md-3">
                        <label className='text-white' htmlFor="inputPassword4">المنافسة</label>
                        <div className='my-2'>
                            <Select isClearable value={selectedSelect?.competition ? selectedSelect?.competition : competitionDefault} name={selectedSelect} onChange={handleSelectChange} options={state.competition} placeholder="أكتب..." />
                        </div>
                    </div>
                    <div className="form-group col-md-3 text-white">
                        <label htmlFor="inputEmail4">الفئة</label>
                        <div className='my-2'>
                            <Select className='text-light' value={selectedSelect?.category ? selectedSelect?.category : categoryDefault} isClearable name={selectedSelect} onChange={handleSelectChange} options={state.category} placeholder="أكتب..." />
                        </div>
                    </div>
                </div>
                <div className="row my-2">
                    <div className="col-md-12">
                        <div class=" card text-center bg-light text-white">
                            <div class="card-header bg-secondary">
                                طاقم تحكيمي
                            </div>
                            <div class="card-body">
                                <div className="row">
                                    <div className="form-group col-md-3">
                                        <label htmlFor="inputEmail4">الحكم</label>
                                        <div className='my-2'>
                                            <Select className='text-light' value={selectedSelect?.arbitre_c_id ? selectedSelect?.arbitre_c_id : arbitreDefault} options={state.centre} name={selectedSelect} onChange={handleSelectChange} placeholder="اختر..." />
                                            {/* onChange={(a) => setSelectedCentre(a)} */}
                                        </div>
                                    </div>
                                    <div className="form-group col-md-3">
                                        <label htmlFor="inputEmail4">الحكم المساعد 1</label>
                                        <div className='my-2'>
                                            <Select className='text-light' value={selectedSelect?.arbitre_a1_id ? selectedSelect?.arbitre_a1_id : arbitre_a1_idDefault} options={state.assistant_1} name={selectedSelect} onChange={handleSelectChange} placeholder="اختر..." />
                                        </div>
                                    </div>
                                    <div className="form-group col-md-3">
                                        <label htmlFor="inputEmail4">الحكم المساعد 2</label>
                                        <div className='my-2'>
                                            <Select className='text-light' value={selectedSelect?.arbitre_a2_id ? selectedSelect?.arbitre_a2_id : arbitre_a2_idDefault} options={state.assistant_2} name={selectedSelect} onChange={handleSelectChange} placeholder="اختر..." />
                                        </div>
                                    </div>
                                    <div className="form-group col-md-3">
                                        <label htmlFor="inputEmail4">المراقب</label>
                                        <div className='my-2'>
                                            <Select className='text-light' value={selectedSelect?.delegue_id ? selectedSelect?.delegue_id : delegue_idDefaulte} options={state.delegue} name={selectedSelect} onChange={handleSelectChange} placeholder="اختر..." />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group col-md-3">
                                        <label htmlFor="inputEmail4">المدينة</label>
                                        <div className='my-2'>
                                            <Select className='text-light' isDisabled options={state.centreVille} value={selectedSelect?.villeCentre ? { value: selectedSelect?.villeCentre?.value, label: selectedSelect?.villeCentre?.label } : { value: arbitreDefault?.ville?.id, label: arbitreDefault?.ville?.nom }} onChange={handleSelectChange} placeholder="..." />
                                        </div>
                                    </div>
                                    <div className="form-group col-md-3">
                                        <label htmlFor="inputEmail4">المدينة</label>
                                        <div className='my-2'>
                                            <Select className='text-light' isDisabled options={state.assistant_1_Ville} value={selectedSelect.villeAssistant_1 ? { value: selectedSelect.villeAssistant_1?.value, label: selectedSelect.villeAssistant_1?.label } : { value: arbitre_a1_idDefault?.ville?.id, label: arbitre_a1_idDefault?.ville?.nom }} onChange={handleSelectChange} placeholder="..." />
                                            {/* value={selectedAsisstent_1 ? { value: selectedAsisstent_1.ville.id, label: selectedAsisstent_1.ville.nom } : null} */}
                                        </div>
                                    </div>
                                    <div className="form-group col-md-3">
                                        <label htmlFor="inputEmail4">المدينة</label>
                                        <div className='my-2'>
                                            <Select className='text-light' isDisabled options={state.assistant_2_Ville} value={selectedSelect.villeAssistant_2 ? { value: selectedSelect.villeAssistant_2?.value, label: selectedSelect.villeAssistant_2?.label } : { value: arbitre_a2_idDefault?.ville?.id, label: arbitre_a2_idDefault?.ville?.nom }} onChange={handleSelectChange} placeholder="..." />
                                        </div>
                                    </div>
                                    <div className="form-group col-md-3">
                                        <label htmlFor="inputEmail4">المدينة</label>
                                        <div className='my-2'>
                                            <Select className='text-light' isDisabled options={state.delegueVille} value={selectedSelect.villeDelegue ? { value: selectedSelect?.villeDelegue?.value, label: selectedSelect?.villeDelegue?.label } : { value: delegue_idDefaulte?.ville?.id, label: delegue_idDefaulte?.ville?.nom }} onChange={handleSelectChange} placeholder="..." />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row my-2">
                    <div className="col-md-6">
                        <div class=" card text-center bg-light text-white">
                            <div class="card-header bg-secondary">
                                المقابلة
                            </div>
                            <div class="card-body">
                                <div className="row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputEmail4">الفريق المستقبل</label>
                                        <div className='my-2'>
                                            <Select className='text-light' value={selectedSelect?.club_id_1 ? selectedSelect?.club_id_1 : clubs_1Defaulte} options={state.clubs_1} name={selectedSelect} onChange={handleSelectChange} placeholder="اختر..." />
                                        </div>
                                    </div>
                                    <div className="form-group  col-md-6">
                                        <label htmlFor="inputEmail4">الفريق الزائر</label>
                                        <div className='my-2'>
                                            <Select className='text-light' value={selectedSelect?.club_id_2 ? selectedSelect?.club_id_2 : clubs_2Defaulte} options={state.clubs_2} name={selectedSelect} onChange={handleSelectChange} placeholder="اختر..." />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div class=" card text-center bg-light text-white">
                            <div class="card-header bg-secondary">
                                النتيجة
                            </div>
                            <div class="card-body">
                                <div className="row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputEmail4">الفريق المستقبل</label>
                                        <input type="namber" name='result_club_1' value={selectedSelect?.result_club_1 ? selectedSelect?.result_club_1 : matche?.result_club_1} onChange={handleInputChange} className="form-control bg-white border-0 mt-2 mb-2" id="inputPassword4" placeholder='' />
                                    </div>
                                    <div className="form-group  col-md-6">
                                        <label htmlFor="inputEmail4">الفريق الزائر</label>
                                        <input type="namber" name='result_club_2' value={selectedSelect?.result_club_2 ? selectedSelect?.result_club_2 : matche?.result_club_1} onChange={handleInputChange} className="form-control bg-white border-0 mt-2 mb-2" id="inputPassword4" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row my-2">
                    <div className="form-group col-md-4">
                        <label className='text-white' htmlFor="inputPassword4">التوقيت</label>
                        <input type="time" name='temps' value={selectedSelect?.temps ? selectedSelect?.temps : matche?.temps} onChange={handleInputChange} className="form-control bg-white border-light mt-2 mb-2" id="inputPassword4" />
                    </div>
                    <div className="form-group col-md-4">
                        <label className='text-white' htmlFor="inputEmail4">الملعب</label>
                        <div className="my-2">
                            <Select className='text-light' value={selectedSelect?.stadeClub_1 ? { value: selectedSelect?.stadeClub_1?.value, label: selectedSelect?.stadeClub_1?.label } : { value: matche?.stade.id, label: matche?.stade.nom }} options={state.stades} name={selectedSelect} onChange={handleSelectChange} placeholder="اكتب" />
                        </div>
                    </div>
                    <div className="form-group col-md-4">
                        <label className='text-white' htmlFor="inputEmail4">المدينة</label>
                        <div className="my-2">
                            <CreatableSelect className='text-light' php isDisabled value={selectedSelect?.stadeClub_1?.ville ? { value: selectedSelect?.stadeClub_1?.ville?.id, label: selectedSelect?.stadeClub_1?.ville?.nom } : { value: matche?.ville.id, label: matche?.ville.nom }} options={state.villes} name={selectedSelect} onChange={handleSelectChange} placeholder="اكتب" />
                        </div>
                    </div>
                </div>
                <div className="row my-2">
                    <div className="col-md-12">
                        <div class="card text-center bg-light text-white">
                            <div class="card-header bg-secondary">
                                الأحداث المسجلة قبل, أثناء و بعد المباراة :
                            </div>
                            <div class="card-body">
                                <div className="row">
                                    <div className="form-group col-md-4">
                                        <label htmlFor="inputPassword4">1.	توقيت حضور مراقب المباراة : </label>
                                        <input type="time" value={selectedSelect?.temp_presence_delegue ? selectedSelect?.temp_presence_delegue : matche?.temp_presence_agents_sécurité} name='temp_presence_delegue' onChange={handleInputChange} className="form-control bg-white border-light mt-2 mb-2" id="inputPassword4" />
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label htmlFor="inputPassword4">2.  توقيت حضور رجال الأمن :</label>
                                        <input type="time" value={selectedSelect?.temp_presence_agents_sécurité ? selectedSelect?.temp_presence_agents_sécurité : matche?.temp_presence_delegue} name='temp_presence_agents_sécurité' onChange={handleInputChange} className="form-control bg-white border-light mt-2 mb-2" id="inputPassword4" />
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label htmlFor="inputPassword4">3.	عدد رجال الامن</label>
                                        <input type="nember" value={selectedSelect?.nombre_agents_sécurité ? selectedSelect?.nombre_agents_sécurité : matche?.nombre_agents_sécurité} name='nombre_agents_sécurité' onChange={handleInputChange} className="form-control bg-white border-light mt-2 mb-2" id="inputPassword4" />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputPassword4">4.	ارضية الملعب</label>
                                        <input type="text" value={selectedSelect?.etat_stade ? selectedSelect?.etat_stade : matche?.etat_stade} name='etat_stade' onChange={handleInputChange} className="form-control bg-white border-light mt-2 mb-2" id="inputPassword4" />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputPassword4">5.	مستودع ملابس الحكام </label>
                                        <input type="text" value={selectedSelect?.etat_vestiaire ? selectedSelect?.etat_vestiaire : matche?.etat_vestiaire} name='etat_vestiaire' onChange={handleInputChange} className="form-control bg-white border-light mt-2 mb-2" id="inputPassword4" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row my-2">
                    <div className="col-md-12">
                        <div class="card text-center bg-light text-white">
                            <div class="card-header bg-secondary">
                                التقرير الاضافي للحكم:
                            </div>
                            <div class="card-body">
                                <div className="row">
                                    <div class="md-form">
                                        <textarea class="md-textarea form-control bg-white border-light" value={selectedSelect?.rapport_supp ? selectedSelect?.rapport_supp : matche?.rapport_supp} name='rapport_supp' onChange={handleInputChange} rows="3"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button className={`btn  ${isValide ? 'btn-warning text-danger' : 'btn-secondary'}`} onClick={sendData}>Valider</button>
            </div>

        </>
    )
}
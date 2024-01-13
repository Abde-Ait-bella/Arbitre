import { React, useEffect, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, Filler, ArcElement, RadialLinearScale } from 'chart.js';
import { Bar, Pie, PolarArea } from "react-chartjs-2";
import axios from "axios";

import { Line } from 'react-chartjs-2';
// import faker from 'faker';

ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    RadialLinearScale,
    Title,
    Tooltip,
    Filler,
    Legend
);

function Home() {

    const [matcheData, setMatcheData] = useState();
    const [matche_01, setMatche_01] = useState();
    const [matche_02, setMatche_02] = useState();
    const [matche_03, setMatche_03] = useState();
    const [matche_04, setMatche_04] = useState();
    const [matche_05, setMatche_05] = useState();
    const [matche_06, setMatche_06] = useState();
    const [matche_07, setMatche_07] = useState();
    const [avertData, setAvertData] = useState();

    useEffect(() => {
        axios.get('http://localhost:8000/api/matche')
            .then((res) => {
                setMatcheData(res.data);
                const filteredMatches_01 = res.data.filter(match => {
                    const matchDate = new Date(match.date);
                    return matchDate.getMonth() === 0 && matchDate.getFullYear() === 2024;
                });

                const filteredMatches_02 = res.data.filter(match => {
                    const matchDate = new Date(match.date);
                    return matchDate.getMonth() === 1 && matchDate.getFullYear() === 2024;
                });

                const filteredMatches_03 = res.data.filter(match => {
                    const matchDate = new Date(match.date);
                    return matchDate.getMonth() === 2 && matchDate.getFullYear() === 2024;
                });
                const filteredMatches_04 = res.data.filter(match => {
                    const matchDate = new Date(match.date);
                    return matchDate.getMonth() === 3 && matchDate.getFullYear() === 2024;
                });
                const filteredMatches_05 = res.data.filter(match => {
                    const matchDate = new Date(match.date);
                    return matchDate.getMonth() === 4 && matchDate.getFullYear() === 2024;
                });
                const filteredMatches_06 = res.data.filter(match => {
                    const matchDate = new Date(match.date);
                    return matchDate.getMonth() === 5 && matchDate.getFullYear() === 2024;
                });
                const filteredMatches_07 = res.data.filter(match => {
                    const matchDate = new Date(match.date);
                    return matchDate.getMonth() === 6 && matchDate.getFullYear() === 2024;
                });
                setMatche_01(filteredMatches_01?.map((m) => m?.id))
                setMatche_02(filteredMatches_02?.map((m) => m?.id))
                setMatche_03(filteredMatches_03?.map((m) => m?.id))
                setMatche_04(filteredMatches_04?.map((m) => m?.id))
                setMatche_05(filteredMatches_05?.map((m) => m?.id))
                setMatche_06(filteredMatches_06?.map((m) => m?.id))
                setMatche_07(filteredMatches_07?.map((m) => m?.id))

            })
        axios.get('http://localhost:8000/api/avertissement')
            .then((res) => { setAvertData(res.data) });
    }, [])
    const avert_01 = avertData?.filter((a) => matche_01?.some((m) => m === a?.matche?.id))
    const avert_01_G = avert_01?.filter((a) => a.type === 'G')
    const avert_01_R = avert_01?.filter((a) => a.type === 'R')

    const avert_02 = avertData?.filter((a) => matche_02?.some((m) => m === a?.matche?.id))
    const avert_02_G = avert_02?.filter((a) => a.type === 'G')
    const avert_02_R = avert_02?.filter((a) => a.type === 'R')

    const avert_03 = avertData?.filter((a) => matche_03?.some((m) => m === a?.matche?.id))
    const avert_03_G = avert_03?.filter((a) => a.type === 'G')
    const avert_03_R = avert_03?.filter((a) => a.type === 'R')

    const avert_04 = avertData?.filter((a) => matche_04?.some((m) => m === a?.matche?.id))
    const avert_04_G = avert_04?.filter((a) => a.type === 'G')
    const avert_04_R = avert_04?.filter((a) => a.type === 'R')

    const avert_05 = avertData?.filter((a) => matche_05?.some((m) => m === a?.matche?.id))
    const avert_05_G = avert_05?.filter((a) => a.type === 'G')
    const avert_05_R = avert_05?.filter((a) => a.type === 'R')

    const avert_06 = avertData?.filter((a) => matche_06?.some((m) => m === a?.matche?.id))
    const avert_06_G = avert_06?.filter((a) => a.type === 'G')
    const avert_06_R = avert_06?.filter((a) => a.type === 'R')

    const avert_07 = avertData?.filter((a) => matche_07?.some((m) => m === a?.matche?.id))
    const avert_07_G = avert_07?.filter((a) => a.type === 'G')
    const avert_07_R = avert_07?.filter((a) => a.type === 'R')

    const minim = matcheData?.filter((m) => m.categorie_id === 1)
    const cade = matcheData?.filter((m) => m.categorie_id === 2)
    const jenior = matcheData?.filter((m) => m.categorie_id === 3)
    const senior_1 = matcheData?.filter((m) => m.categorie_id === 4)
    const senior_2 = matcheData?.filter((m) => m.categorie_id === 5)
    const senior_3 = matcheData?.filter((m) => m.categorie_id === 6)

    const compBotola = matcheData?.filter((m) => m.competition_id === 1)
    const compKaas = matcheData?.filter((m) => m.competition_id === 2)

    const options_Line = {
        responsive: true,
        scales: {
            x: {
                beginAtZero: true,
                ticks: {
                    color: '#6C7293', // Change x-axis label color
                    font: {
                        size: 14,
                    }
                },
            },  
            y: {
                beginAtZero: true,
                ticks: {
                    color: '#6C7293', // Change x-axis label color
                    callback: function (value) {
                        return value.toLocaleString(); // Format the value as needed
                      },
                },
            },
        },
        plugins: {
            legend: {
                // position: 'top',
            },
            title: {
                display: true,
                text: 'المبـاريــــــــات',
                color: 'white',
                font: {
                    size: 20,
                    weight: 'bold',
                }
            },
            legend: {
                labels: {
                    color: '#6C7293', // Change legend text color
                    font: {
                        size: 16,
                        weight: 'bold',
                    }
                },
            },
        },
    };

    const data_Line = {
        labels : ['يوليوز', 'يونيو', 'ماي', 'ابريل', 'مارس', 'فبراير', 'يناير'],
        datasets: [
            {
                fill: true,
                label: 'عدد المباريات',
                data: [matche_07?.length, matche_06?.length, matche_05?.length, matche_04?.length, matche_03?.length, matche_02?.length, matche_01?.length],
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    const data_Pie = {
        labels: ['كأس العرش', 'البطولة'],
        datasets: [
            {
                label: 'عدد المباريات',
                data: [compKaas?.length, compBotola?.length],
                backgroundColor: [
                    '#fff707',
                    '#ff5607',
                ],
                borderColor: [
                    '#6C7293',
                    '#6C7293',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options_Pie = {
        maintainAspectRatio : false ,
        plugins : {
            title: {
                display: true,
                text: 'المنافسات',
                color: '#6C7293',
                font: {
                    size: 35,
                    weight: 'bold',
                }
            },
            legend: {
                labels: {
                    color: '#6C7293', // Change legend text color
                    font: {
                        size: 16,
                        weight: 'bold',
                    }
                },
            },
        }
    }

    const optionsBar = {
        // responsive: true,
        scales: {
            x: {
                beginAtZero: true,
                ticks: {
                    color: 'white', // Change x-axis label color
                    font: {
                        size: 14,
                    }
                },
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color : '#6C7293',
                    // font: {
                    //     size: 1,
                    // } // Change y-axis label color
                    // callback: function (value) {
                    //     return value.toLocaleString(); // Format the value as needed
                    //   },
                },
            },
        },

        plugins: {
            title: {
                display: true,
                text: 'البطـاقـــــــــات',
                color: 'white',
                font: {
                    size: 19,
                    weight: 'bold',
                }
            },
            legend: {
                labels: {
                    color: '#6C7293', // Change legend text color
                    font: {
                        size: 16,
                        weight: 'bold',
                    }
                },
            },
        },
    }

    const dataBar = {
        labels: ['يوليوز', 'يونيو', 'ماي', 'ابريل', 'مارس', 'فبراير', 'يناير'],
        datasets: [
            {
                label: 'البطاقات الصفراء',
                data: [avert_07_G?.length, avert_06_G?.length, avert_05_G?.length, avert_04_G?.length, avert_03_G?.length, avert_02_G?.length, avert_01_G?.length],
                backgroundColor: '#ffb007',
            },
            {
                label: 'البطاقات الحمراء',
                data: [avert_07_R?.length, avert_06_R?.length, avert_05_R?.length, avert_04_R?.length, avert_03_R?.length, avert_02_R?.length, avert_01_R?.length],
                backgroundColor: '#EB1616',
            },
        ],
    };

    const dataPolarAria = {
        labels: ['الصغار', 'الفتيان', 'الشبان', 'الشرفي التاني', 'الشرفي التاني', 'الشرفي الممتاز'],
        datasets: [
          {
            label: 'عدد المباريات',
            data: [minim?.length, cade?.length, jenior?.length, senior_1?.length, senior_2?.length, senior_3?.length],
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)',
            ],
            borderWidth: 1,
          },
        ],
      };

      const optionsPolarAria = {
        // responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'الفئات',
                color: '#6C7293',
                font: {
                    size: 35,
                    weight: 'bold',
                }
            },
            legend: {
                labels: {
                    color: '#6C7293', // Change legend text color
                    font: {
                        size: 16,
                        weight: 'bold',
                    }
                },
            },
        },
    }
    return (
        <>
            {/* <!-- Sale & Revenue Start --> */}
            < div class="container-fluid pt-4 px-4" >
                <div class="row">
                    {/* <div class="col-sm-6 col-xl-3">
                        <div class="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                        <i class="fa fa-chart-line fa-3x text-primary"></i>
                        <div class="ms-3">
                        <p class="mb-2">عدد البطاقات الصفراء</p>
                        <h6 class="mb-0">$1234</h6>
                        </div>
                        </div>
                    </div> */}
                    <div class="col-sm-6 col-xl-6">
                        <div class="bg-secondary rounded d-flex align-items-center justify-content-center p-4">
                            <Bar data={dataBar} options={optionsBar} />
                        </div>
                    </div>
                    <div class="col-sm-6 col-xl-6">
                        <div class="bg-secondary rounded d-flex align-items-center justify-content-center p-4">
                            <Line options={options_Line} data={data_Line} />
                        </div>
                    </div>
                    <div className="col-sm-12 col-xl-12 pt-4" >
                        <div className="bg-secondary rounded d-flex align-items-center justify-content-center p-4">
                            <Pie data={data_Pie} options={options_Pie} style={{ height: '500px' }}/>
                        </div>
                    </div>
                    <div className="col-sm-12 col-xl-12 pt-4" >
                        <div className="bg-secondary rounded d-flex align-items-center justify-content-center p-4">
                            <PolarArea data={dataPolarAria} options={optionsPolarAria}/>
                        </div>
                    </div>
                    {/* <div class="col-sm-6 col-xl-3">
                        <div class="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                            <i class="fa fa-chart-area fa-3x text-primary"></i>
                            <div class="ms-3">
                                <p class="mb-2">Today Revenue</p>
                                <h6 class="mb-0">$1234</h6>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div >
            {/* <!-- Sale & Revenue End --> */}

        </>
    )
}
export default Home;
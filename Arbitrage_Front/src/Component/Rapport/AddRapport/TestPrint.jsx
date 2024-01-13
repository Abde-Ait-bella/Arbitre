// import React from "react";
// import { useRef } from "react";
// import { useReactToPrint } from "react-to-print";
// import "./TestPrint.css";

// export function TestPrint () {

//     const componentRef = useRef()

//     const handlePrint = useReactToPrint({
//         content: () => componentRef.current,
//     });

//     return (
//         <>
//             <button onClick={handlePrint}><i class="fa-solid fa-print"></i></button>
//             <div className="test" ref={componentRef}>
//                 <h1 className="text-danger">testPrint</h1>
//             </div>
//         </>
//     )
// }
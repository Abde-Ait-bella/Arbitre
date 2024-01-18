import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import "./style/style.scss"
import { Route, Routes } from 'react-router-dom';
import Login from './Login';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path='/login' element={<Login />} />
        </Routes>

        {/* <App /> */}
    </BrowserRouter>
);

// const appRoot = ReactDOM.createRoot(document.getElementById('app-root'));
// appRoot.render(
//     <BrowserRouter>
//         <Routes>
//             <Route path='/login' element={<Login />} />
//         </Routes>
//     </BrowserRouter>
// );

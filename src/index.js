import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './style.css';

import Header from './componant/header/header';
import Footer from './componant/footer/footer';

import Accueil from './pages/accueil/accueil';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
            <Header />
            <Routes>
                <Route exact path="/" element={<Accueil />} />
            </Routes>
            <Footer />
        </Router>
    </React.StrictMode>
);

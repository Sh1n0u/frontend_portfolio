import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './style.css';

import Header from './componant/header/header';
import Footer from './componant/footer/footer';

import Accueil from './pages/accueil/accueil';
import Competences from './pages/competences/competences';
import Experiences from './pages/experiences/experiences';
import AboutMe from './pages/about-me/about-me';
import Contact from './pages/contact/contact';
import Admin from './pages/admin/admin';
import Login from './pages/login/login';
import Error from './pages/error/error';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
            <Header />
            <Routes>
                <Route exact path="/" element={<Accueil />} />
                <Route path="*" element={<Error />} />
                <Route path="competence" element={<Competences />} />
                <Route path="experience" element={<Experiences />} />
                <Route path="apropos" element={<AboutMe />} />
                <Route path="contact" element={<Contact />} />
                <Route path="login" element={<Login />} />
                <Route path="admin" element={<Admin />} />
            </Routes>
            <Footer />
        </Router>
    </React.StrictMode>
);

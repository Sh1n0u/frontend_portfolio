import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './style.css'

import Header from './componant/header/header';
import Footer from './componant/footer/footer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
            <Header />
            <Footer />
        </Router>
    </React.StrictMode>
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PaginaError from './pages/PaginaError';
import LandingPage from './pages/LandingPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/inquilinos" element={<LandingPage />} />
        <Route path="/propiedades" element={<LandingPage />} />
        <Route path="/reservas" element={<LandingPage />} />
        <Route path="*" element={<PaginaError />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

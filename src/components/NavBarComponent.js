import React from 'react';
import { NavLink } from 'react-router-dom';
import { getNavLinkClass } from '../utils/index';

function NavBarComponent(){
    return (
        <nav>
            <ul className='flex space-x-4'>
                <NavLink className={({ isActive }) => getNavLinkClass(isActive)} to="/">Propiedades</NavLink>
                <NavLink className={({ isActive }) => getNavLinkClass(isActive)} to="/tipo-propiedades">Tipo Propiedades</NavLink>
                <NavLink className={({ isActive }) => getNavLinkClass(isActive)} to="/reservas">Reservas</NavLink>
                <NavLink className={({ isActive }) => getNavLinkClass(isActive)} to="/crear-tipo-propiedad">CTP</NavLink>
                <NavLink className={({ isActive }) => getNavLinkClass(isActive)} to="/crear-reserva">CR</NavLink>
            </ul>
        </nav>
    );
};

export default NavBarComponent;